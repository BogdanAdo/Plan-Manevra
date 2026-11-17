// Offline support. Bump CACHE when you publish a new version of the files.
const CACHE = 'maneuver-plan-v7';
const JSPDF_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
const CORE = [
  './', 'index.html', 'manifest.webmanifest',
  'maps/constanta-north.jpg', 'maps/agigea.jpg', 'maps/midia.jpg', 'maps/mangalia.jpg',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'jspdf.umd.min.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(async function (cache) {
    // Each file on its own, so one missing optional file does not stop the install.
    await Promise.all(CORE.map(function (u) { return cache.add(u).catch(function () {}); }));
    // The PDF library: keep a copy of the CDN version too, in case the local file is absent.
    try {
      const req = new Request(JSPDF_CDN, { mode: 'no-cors' });
      await cache.put(req, await fetch(req));
    } catch (err) {}
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function store(req, res) {
  if (res && (res.ok || res.type === 'opaque')) {
    const copy = res.clone();
    caches.open(CACHE).then(function (c) { c.put(req, copy); });
  }
  return res;
}

self.addEventListener('fetch', function (e) {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isCdn = url.hostname === 'cdnjs.cloudflare.com';
  if (url.origin !== location.origin && !isCdn) return;
  const heavy = isCdn || /\/(maps|icons)\//.test(url.pathname) || /jspdf/.test(url.pathname);

  if (heavy) {
    // Cache first: these files do not change.
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) { return store(req, res); });
    }));
    return;
  }
  // Pages: show the saved copy immediately and refresh it in the background.
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(function (hit) {
    const net = fetch(req).then(function (res) { return store(req, res); }).catch(function () { return hit; });
    return hit || net.then(function (r) { return r || caches.match('index.html'); });
  }));
});
