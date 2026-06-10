# Racimo

🍇 **[Live demo](https://pgreyesm.github.io/racimo/)** · [Read the manifesto](manifesto.md) · [Leer en español](manifiesto.md)

> Think in trees, not in scrolls. — Piensa en árboles, no en pergaminos.

A spatial canvas for AI conversations. Branches you can return to, not threads you lose.

Racimo is a free, installable web app (PWA) that turns linear chat into a navigable cluster of conversations — each conversation is a "grape", grapes group into "clusters", clusters can be distilled into a single synthesis. You bring your own OpenRouter key; nothing leaves your browser.

## Three core ideas

1. **Multiplicity** — many conversations at once, on a single canvas. Each chat is a window you drag. Cords stay visible, connecting every conversation back to its origin in the cluster.
2. **Branching** — when Claude marks a concept with `[[brackets]]`, click it to spawn a new branch without losing the original. Or select any phrase and branch from there.
3. **Synthesis** — when a cluster matures, distill it into an exportable document that captures everything that happened inside.

## How it works

- **Landing** ([`index.html`](index.html)) — bilingual ES/EN landing page with the pitch, the three ideas, and an install button.
- **The app** ([`app.html`](app.html)) — the actual spatial canvas. Floating chat windows, drag & drop, cords drawn between conversations and their grape of origin, distillation, BYOK key vault.
- **PWA** — installable from any modern browser. After install, the app icon lives on your dock or home screen and launches straight into `app.html`.
- **BYOK** — bring your own OpenRouter key (300+ models). Your key is stored locally only; your browser talks directly to OpenRouter. No server in between, no telemetry.

## Privacy

Conversations and your API key live exclusively in your browser's `localStorage`. Nothing leaves your machine unless you explicitly export a `.racimo` file. The landing and app are static HTML; the only outbound network calls are to OpenRouter, made directly from your browser using your key.

## In this repo

- [`index.html`](index.html) — bilingual landing page (cinematic minimalist, scroll-driven animations)
- [`app.html`](app.html) — the spatial canvas application
- [`sw.js`](sw.js) — service worker for PWA / offline support
- [`manifest.json`](manifest.json) — PWA install manifest
- [`icon-192.png`](icon-192.png) / [`icon-512.png`](icon-512.png) — app icons
- [`media/`](media/) — demo video loops embedded in the landing (with SVG fallbacks while videos aren't recorded yet)
- [`manifesto.md`](manifesto.md) / [`manifiesto.md`](manifiesto.md) — manifesto in English / Spanish
- [`guia-visita.md`](guia-visita.md) — bilingual visit guide

## Context

Non-linear, branching chat is an emerging pattern — Canvas Chat, LMCanvas, and the Branchat paper (CHI 2026) all explore it. Racimo is the same idea executed with product-design criteria: a living metaphor and an experience you'd want to spend time in, rather than a visualized graph.

## Contact

Pedro — contacto31@gmail.com · [Buy me a coffee ☕](https://ko-fi.com/pgreyesm)

Independent project, not affiliated with Anthropic.
