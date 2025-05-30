const CACHE_NAME = 'pwa-icon-selector-v2';
const urlsToCache = [
    '/',
    '/manifest.json',
    '/iconsets/a/pwa-64x64.png',
    '/iconsets/a/pwa-192x192.png',
    '/iconsets/a/pwa-512x512.png',
    '/iconsets/a/apple-touch-icon-180x180.png',
    '/iconsets/a/maskable-icon-512x512.png',
    '/iconsets/b/pwa-64x64.png',
    '/iconsets/b/pwa-192x192.png',
    '/iconsets/b/pwa-512x512.png',
    '/iconsets/b/apple-touch-icon-180x180.png',
    '/iconsets/b/maskable-icon-512x512.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 