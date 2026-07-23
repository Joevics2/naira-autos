// This service worker previously cache-first'd the homepage, which caused
// stale HTML (referencing deleted, hashed build assets) to be served after
// every deploy — breaking layout/CSS for returning visitors.
//
// This version does the opposite: it deletes all caches it controls and
// unregisters itself, so any device that installed the old worker heals
// on its next visit. Once rolled out for a while, this file (and its
// registration, if any exists) can be removed entirely.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(cacheNames.map((name) => caches.delete(name))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      })
  );
});

// No fetch handler — requests pass straight through to the network.
