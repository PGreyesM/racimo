/**
 * Racimo de Conversaciones — Cloudflare Worker Proxy
 * ===================================================
 *
 * Este Worker recibe peticiones del prototipo (en GitHub Pages u otro origen)
 * y las reenvía a un proveedor de LLM (Anthropic o Groq) usando una API key
 * guardada como secret en Cloudflare. Así el prototipo público puede hablar
 * con un LLM de verdad sin exponer la API key en el HTML.
 *
 * Variables que necesita configuradas en el dashboard del Worker:
 *
 *   - PROVIDER          (texto, opcional)  — "anthropic" (default) o "groq".
 *
 *   Si PROVIDER es "anthropic":
 *     - ANTHROPIC_API_KEY  (Secret, requerido) — key de console.anthropic.com
 *     - CLAUDE_MODEL       (texto, opcional)   — default "claude-haiku-4-5-20251001"
 *                                                 Para mejor calidad: "claude-sonnet-4-6"
 *
 *   Si PROVIDER es "groq":
 *     - GROQ_API_KEY       (Secret, requerido) — key de console.groq.com
 *     - GROQ_MODEL         (texto, opcional)   — default "llama-3.3-70b-versatile"
 *                                                 Alternativas: "llama-3.1-70b-versatile",
 *                                                 "mixtral-8x7b-32768", "deepseek-r1-distill-llama-70b"
 *
 *   - ALLOWED_ORIGINS    (texto, opcional)   — lista separada por comas de orígenes
 *                                              permitidos. Ej: "https://pgreyesm.github.io,http://localhost:8000"
 *                                              Si lo dejas vacío, acepta cualquier origen.
 *   - MAX_PROMPT_CHARS   (texto, opcional)   — corta prompts más largos. Default 16000.
 *   - MAX_OUTPUT_TOKENS  (texto, opcional)   — límite de output. Default 800.
 */

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Preflight CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin, env) });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, origin, env);
    }

    // Origin check (opcional)
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
    if (allowed.length > 0 && origin && !allowed.includes(origin)) {
      return json({ error: 'Origin not allowed: ' + origin }, 403, origin, env);
    }

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ error: 'Invalid JSON body' }, 400, origin, env);
    }

    const maxChars = parseInt(env.MAX_PROMPT_CHARS || '16000', 10);
    const prompt = String(body.prompt || '').slice(0, maxChars);
    if (!prompt.trim()) {
      return json({ error: 'Empty prompt' }, 400, origin, env);
    }

    const provider = (env.PROVIDER || 'anthropic').toLowerCase();
    const maxTokens = parseInt(env.MAX_OUTPUT_TOKENS || '800', 10);

    try {
      if (provider === 'groq') {
        return await callGroq(prompt, maxTokens, env, origin);
      }
      return await callAnthropic(prompt, maxTokens, env, origin);
    } catch (e) {
      return json({ error: String(e && (e.message || e)) }, 500, origin, env);
    }
  },
};

async function callAnthropic(prompt, maxTokens, env, origin) {
  if (!env.ANTHROPIC_API_KEY) {
    return json({ error: 'Server misconfigured: ANTHROPIC_API_KEY not set' }, 500, origin, env);
  }
  const model = env.CLAUDE_MODEL || 'claude-haiku-4-5-20251001';
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const data = await r.json();
  if (!r.ok) {
    return json({ error: 'Anthropic API error', status: r.status, details: data }, r.status, origin, env);
  }
  let text = '';
  if (Array.isArray(data.content)) {
    for (const block of data.content) {
      if (block.type === 'text' && typeof block.text === 'string') text += block.text;
    }
  }
  return json({ reply: text, model, provider: 'anthropic' }, 200, origin, env);
}

async function callGroq(prompt, maxTokens, env, origin) {
  if (!env.GROQ_API_KEY) {
    return json({ error: 'Server misconfigured: GROQ_API_KEY not set' }, 500, origin, env);
  }
  const model = env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + env.GROQ_API_KEY,
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const data = await r.json();
  if (!r.ok) {
    return json({ error: 'Groq API error', status: r.status, details: data }, r.status, origin, env);
  }
  const text = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
    ? data.choices[0].message.content
    : '';
  return json({ reply: text, model, provider: 'groq' }, 200, origin, env);
}

function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  // If allowed list is empty or origin is in the list, echo the origin back (else use *)
  let allowOrigin = '*';
  if (origin && (allowed.length === 0 || allowed.includes(origin))) {
    allowOrigin = origin;
  } else if (allowed.length > 0) {
    allowOrigin = allowed[0]; // fall back to first allowed
  }
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function json(obj, status, origin, env) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      ...corsHeaders(origin, env),
      'Content-Type': 'application/json',
    },
  });
}
