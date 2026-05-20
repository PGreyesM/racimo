# Racimo

🍇 [Live demo](https://pgreyesm.github.io/racimo/) · [Read the manifesto](manifesto.md)

A spatial, branching canvas interface for conversations with LLMs. Three integrated ideas:

1. **Spatial navigation** — conversations as grapes grouped into clusters by topic, not as a vertical scroll.
2. **Branching with context inheritance** — any response can fork into a sub-branch that inherits the parent's full context. Git for thinking.
3. **Distillation as a first-class output** — whole clusters synthesized into downloadable, persistent text.

Self-contained HTML, no build step, no dependencies. State persists in `localStorage`. Bilingual (English / Spanish).

## Two versions

- [`index.html`](index.html) — **Cascade (v2), desktop.** Conversations open as free-floating chat windows over an infinite vertical canvas, linked to their origin by visual cords. Includes: open a whole branch family at once, a mini-dock of open windows, "Reorganize" into a folder-tree layout, focus mode, collapsible side and top panels, delete with cascade, and full backup (export / import a `.racimo` file).
- [`racimo-sobrio.html`](racimo-sobrio.html) — **Sober version, responsive.** A single canvas with 3D grapes; mobile-friendly. The cleaner "presentation" reading of the same concept.

## Connecting to a real model

The prototype talks to a live LLM through a small [Cloudflare Worker](cloudflare-worker.js) proxy, so the public demo can hold real conversations without exposing an API key. The Worker is provider-agnostic — point it at Anthropic or Groq with a single environment variable. If no proxy is configured, the prototype falls back to pre-loaded sample conversations (offline mode).

## In this repo

- [`index.html`](index.html) — cascade prototype (v2).
- [`racimo-sobrio.html`](racimo-sobrio.html) — sober / responsive version.
- [`cloudflare-worker.js`](cloudflare-worker.js) — LLM proxy (no secrets; API key lives in Cloudflare).
- [`manifesto.md`](manifesto.md) — manifesto in English.
- [`manifiesto.md`](manifiesto.md) — manifesto in Spanish.
- [`guia-visita.md`](guia-visita.md) — bilingual visit guide (5-minute tour).

## Context

Non-linear, branching chat is an emerging pattern — Canvas Chat, LMCanvas, and the Branchat paper (CHI 2026) all explore it. Racimo is an attempt at the same idea executed with product-design criteria: a living metaphor and an experience you'd want to spend time in, rather than a visualized graph.

## Contact

Pedro — contacto31@gmail.com

Independent project, not affiliated with Anthropic.
