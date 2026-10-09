// Advanced Service Worker for PWA Offline Caching & Push Notifications

const CACHE_NAME = 'lumi-luxury-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/login',
  '/dashboard',
  '/manifest.json'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event (Offline-first fallback strategy)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      });
    })
  );
});

// Background Push Notifications Listener
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Lumi Secure Message';
  const options = {
    body: data.body || 'You have a new encrypted message.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
