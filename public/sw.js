// Self-unregistering fallback service worker for localhost cleanup
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      return self.clients.matchAll();
    }).then((clients) => {
      // Release control over active clients
      clients.forEach((client) => {
        if (client.url && 'navigate' in client) {
          // client can stay as is
        }
      });
    })
  );
});

// Pass-through without caching or clone conflicts
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
