# Conectar el prototipo a Claude vía Cloudflare Workers

Esta guía te lleva de un prototipo "sin LLM real" (lo que pasa hoy en GitHub Pages) a un prototipo público que habla con Claude de verdad. Tiempo estimado: **15 minutos**.

## Lo que vas a montar

```
Tu prototipo (GitHub Pages)  ─→  Cloudflare Worker (con tu API key)  ─→  API de Anthropic
                                                                              │
       ←──────────────── respuesta de Claude ───────────────────────────────────┘
```

La API key vive **solo** en Cloudflare, nunca en el HTML público. El Worker es el intermediario.

## Costos

- **Cloudflare Workers**: free tier — 100,000 peticiones por día gratis. Para una demo no te vas a acercar al límite.
- **Anthropic API**: pagas por uso. Con `claude-haiku-4-5-20251001` (el modelo por defecto del Worker) cada conversación cuesta fracciones de centavo. Para evitar sorpresas, en console.anthropic.com puedes poner un límite de gasto mensual (recomiendo USD 5-10 para una demo).

---

## Atajo: usar Groq en lugar de Anthropic (tier gratuito)

Si todavía no tienes crédito en Anthropic o solo quieres ver el demo funcionando rápido, puedes usar **Groq** (https://console.groq.com). Tiene un tier gratuito generoso y modelos como Llama 3.3 70B que responden muy bien.

Configuración del Worker con Groq:

1. En console.groq.com → Settings → API Keys → **Create API Key** → cópiala
2. En el Worker de Cloudflare, ve a **Settings → Variables and Secrets** y configura:
   - `PROVIDER` (texto) = `groq`
   - `GROQ_API_KEY` (secret) = tu key de Groq
   - `GROQ_MODEL` (texto, opcional) = `llama-3.3-70b-versatile` (default si lo omites)
3. Deploy.

Listo. El resto de la guía (los pasos 1, 2, 3 sobre Anthropic) puedes saltártelos o seguirlos más adelante cuando quieras cambiar a Claude real. Para cambiar el proveedor del Worker, solo modificas la variable `PROVIDER` y haces Deploy de nuevo — sin tocar el código.

Verificación con curl:
```bash
curl -X POST https://racimo-claude-proxy.tu-subdominio.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Di hola en una sola frase."}'
```
Debería devolverte `{"reply":"...","model":"llama-3.3-70b-versatile","provider":"groq"}`.

---

## Paso 1 — Obtén una API key de Anthropic

1. Entra a https://console.anthropic.com
2. Si no tienes cuenta, crea una. Necesitarás cargar algunos dólares de crédito (mínimo 5 USD).
3. En el menú lateral: **Settings → API Keys**
4. **Create Key** → dale un nombre como "racimo-proxy" → **Create**
5. Copia la key (empieza por `sk-ant-...`). **Guárdala en un lugar seguro**; Anthropic no te la vuelve a mostrar.
6. (Recomendado) **Settings → Limits** → fija un límite mensual (ej. USD 10) para no llevarte sustos.

## Paso 2 — Crea una cuenta de Cloudflare

1. Entra a https://dash.cloudflare.com/sign-up
2. Verifica tu correo. **No** necesitas dominio propio ni pagar nada para este uso.

## Paso 3 — Crea el Worker

1. Una vez dentro del dashboard de Cloudflare, en el menú lateral: **Workers & Pages**
2. **Create application** → **Create Worker**
3. Nombre: `racimo-claude-proxy` (o el que quieras, va a ser parte de la URL)
4. Click **Deploy** (deja el "hello world" por defecto, lo reemplazaremos enseguida)
5. Cuando termine: click en **Edit code**
6. Borra todo lo que hay en el editor
7. Pega el contenido completo de **`cloudflare-worker.js`** (está en esta misma carpeta)
8. Arriba a la derecha: **Save and deploy** → confirma

La URL del Worker queda algo así: `https://racimo-claude-proxy.tu-subdominio.workers.dev`. Cópiala.

## Paso 4 — Configura los secrets

Aún dentro del Worker:

1. **Settings** (arriba) → **Variables and Secrets**
2. Click **Add** → tipo: **Secret**
   - Variable name: `ANTHROPIC_API_KEY`
   - Value: pega tu API key de Anthropic (la `sk-ant-...`)
   - Click **Save**
3. (Opcional pero recomendado) Añade otra variable, tipo **Text**:
   - Variable name: `ALLOWED_ORIGINS`
   - Value: `https://pgreyesm.github.io,http://localhost:8000`
   - Esto limita quién puede usar tu Worker. Si lo dejas vacío, cualquier sitio web puede gastarte créditos.
4. (Opcional) Cambia de modelo:
   - Variable name: `CLAUDE_MODEL`
   - Value: `claude-sonnet-4-6` (mejor calidad, más caro) o `claude-haiku-4-5-20251001` (default, barato)

**Importante**: tras añadir o cambiar variables, haz **Deploy** otra vez (Cloudflare lo pide).

## Paso 5 — Verifica que el Worker funciona

Abre una terminal y ejecuta (reemplaza la URL):

```bash
curl -X POST https://racimo-claude-proxy.tu-subdominio.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Di hola en una sola frase."}'
```

Debería devolverte algo como:

```json
{"reply":"Hola, encantado de saludarte.","model":"claude-haiku-4-5-20251001"}
```

Si hay error, lo verás en el JSON. Las causas comunes:
- `ANTHROPIC_API_KEY not set` → falta el secret, repite el paso 4.
- `Origin not allowed` → tu `ALLOWED_ORIGINS` no incluye desde dónde estás llamando. Para tests locales con `curl` sin origen, deja `ALLOWED_ORIGINS` vacío temporalmente.
- `Anthropic API error 401` → la API key es incorrecta o no tiene crédito.

## Paso 6 — Apunta el prototipo al Worker

En la carpeta del proyecto está el archivo `index.html` (lo que se publica en GitHub Pages). Busca esta línea cerca del principio:

```html
<meta name="claude-proxy" content="">
```

Cambia `content=""` por tu URL del Worker:

```html
<meta name="claude-proxy" content="https://racimo-claude-proxy.tu-subdominio.workers.dev">
```

> Si no encuentras esa línea es porque el parche todavía no se aplicó. Avísame y la añado al HTML. La nueva lógica de `safeAskClaude` ya intenta leerla automáticamente: si encuentra `window.cowork` lo usa; si no, prueba el Worker; y si todo falla, cae al texto canned.

Haz commit y push del cambio a tu repo de GitHub:

```bash
cd /ruta/a/tu/repo/racimo
git add index.html
git commit -m "Conectar prototipo a Claude vía Cloudflare Worker"
git push
```

GitHub Pages se actualiza solo en 1-2 minutos.

## Paso 7 — Probar

Entra a https://pgreyesm.github.io/racimo/ desde una pestaña incógnita. Pincha una uva, escribe una pregunta nueva en el chat y dale a Enviar. Si todo está bien, la respuesta nueva viene de Claude. Si ves la respuesta canned (`Claude está pensando ahora mismo...`), abre la consola del navegador (F12) y mira si hay errores — normalmente CORS o la URL del Worker.

---

## Si algo se rompe

| Síntoma | Causa probable | Solución |
|---|---|---|
| Respuestas siguen siendo canned | `<meta name="claude-proxy">` está vacío o no existe | Revisa Paso 6 |
| Error de CORS en consola | Tu `ALLOWED_ORIGINS` no incluye el dominio | Añade el origen exacto al secret |
| `401 Unauthorized` | API key incorrecta o sin crédito | Regenera la key en Anthropic, recarga crédito |
| `429 Too Many Requests` | Te excediste el rate limit de Anthropic | Espera, o sube tu tier en Anthropic |
| Worker responde "Method not allowed" | Estás haciendo GET en lugar de POST | El prototipo siempre hace POST, ignora si fue prueba con navegador |

## Si quieres apagarlo

Borra el Worker (Dashboard → Workers → tu Worker → **Manage → Delete**) o, más simple, borra el secret `ANTHROPIC_API_KEY`. Sin la key el Worker devuelve error y el prototipo vuelve a usar texto canned, todo seguro.

---

¿Estancado en algún paso? Mándame en qué número estás y el mensaje de error exacto.
