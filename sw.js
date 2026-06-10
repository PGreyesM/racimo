// Racimo de Conversaciones — Service Worker
// Cachea el shell para que funcione offline tras la primera visita.
// HTML usa network-first para que ediciones recientes se vean al instante.
// Las llamadas a OpenRouter / Cloudflare Worker pasan derecho a la red.

const CACHE_NAME = 'racimo-shell-v4';
const SHELL = [
  './',
  './index.html',
  './app.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  // Solo manejamos GETs del mismo origen; deja pasar APIs externas
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  // Network-first para documentos HTML: siempre intentar versión fresca,
  // caer al cache solo si la red falla. Esto evita que ediciones recientes
  // queden enterradas bajo un cache viejo.
  const isHTML =
    req.mode === 'navigate' ||
    (req.destination === 'document') ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('/');

  if (isHTML) {
    event.respondWith(
      fetch(req).then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req).then((c) => c || caches.match('./app.html')))
    );
    return;
  }

  // Cache-first para assets estáticos (iconos, manifest, etc.)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => caches.match('./app.html'));
    })
  );
});
