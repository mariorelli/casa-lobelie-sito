/* ============================================================================
   CASA LOBELIE â GUEST GUIDE â SERVICE WORKER
   Ambito limitato a /guest/ (vedi registrazione in app.js con scope esplicito):
   non puÃ² in alcun modo intercettare le richieste del sito principale.
   Strategia: cache-first per i file statici dell'app, network-first per i
   contenuti (cosi le modifiche a content.js/i18n.js arrivano subito),
   con fallback alla cache quando la connessione Ã¨ lenta o assente.
   ============================================================================ */
var CACHE_NAME = "cl-guest-cache-v1";
var APP_SHELL = [
  "/guest/",
  "/guest/index.html",
  "/guest/css/style.css",
  "/guest/js/app.js",
  "/guest/js/qrcode.min.js",
  "/guest/manifest.webmanifest",
  "/guest/icons/icon-192.png",
  "/guest/icons/icon-512.png"
];
var NETWORK_FIRST = ["/guest/js/content.js", "/guest/js/i18n.js"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin || url.pathname.indexOf("/guest/") !== 0) {
    return; // mai intercettare richieste fuori da /guest/
  }

  var isNetworkFirst = NETWORK_FIRST.some(function (p) { return url.pathname === p; });

  if (isNetworkFirst) {
    event.respondWith(
      fetch(event.request).then(function (resp) {
        var copy = resp.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
        return resp;
      }).catch(function () { return caches.match(event.request); })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request).then(function (resp) {
        var copy = resp.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
        return resp;
      });
    })
  );
});
