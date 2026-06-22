// fishy — service worker pentru offline
// Strategie: navigari = network-first (date live cand esti online, cache/offline cand nu);
// asset-uri statice = stale-while-revalidate. /api/ nu se cache-uieste niciodata.

const VERSION = "v1";
const PAGE_CACHE = `fishy-pages-${VERSION}`;
const STATIC_CACHE = `fishy-static-${VERSION}`;
const OFFLINE_URL = "/offline";

// Pagini de bază precache-uite la instalare (tolerant la eșec individual).
const PRECACHE = [
  "/",
  OFFLINE_URL,
  "/specii",
  "/locuri",
  "/tehnici",
  "/monturi",
  "/prohibitie",
  "/glosar",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGE_CACHE)
      .then((cache) => Promise.allSettled(PRECACHE.map((u) => cache.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !k.endsWith(VERSION))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return; // date live — mereu din rețea

  // Navigări HTML: network-first → cache → pagină offline
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(PAGE_CACHE).then((cache) => cache.put(request, copy));
          return res;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  // Asset-uri statice: stale-while-revalidate
  if (
    url.pathname.startsWith("/_next/static") ||
    /\.(?:js|css|woff2?|png|jpg|jpeg|svg|webp|ico)$/.test(url.pathname)
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const network = fetch(request)
            .then((res) => {
              cache.put(request, res.clone());
              return res;
            })
            .catch(() => cached);
          return cached || network;
        })
      )
    );
  }
});
