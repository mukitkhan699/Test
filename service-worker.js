const CACHE_NAME = "knowledge-hub-v1";

const files = [
  "/",
  "/index.html",
<<<<<<< HEAD
  "/styles.css",
  "/script.js",
  "/app.js",
  "/icon.png",
  "/manifest.json"
=======
  "/style.css",
  "/app.js"
>>>>>>> 4059ea543e859d9a249ae0c6bb35b2bd0ef38c2e
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(files))
  );
<<<<<<< HEAD
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
=======
>>>>>>> 4059ea543e859d9a249ae0c6bb35b2bd0ef38c2e
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
<<<<<<< HEAD
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(fetchResponse => {
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
            return fetchResponse;
          }
          const responseToCache = fetchResponse.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return fetchResponse;
        });
      })
=======
      .then(response => response || fetch(event.request))
>>>>>>> 4059ea543e859d9a249ae0c6bb35b2bd0ef38c2e
  );
});
