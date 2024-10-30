const CACHE_VERSION = 1;
const CACHE_NAME = `multikeyboard-v${CACHE_VERSION}`;

// Cache duration in seconds
const CACHE_DURATION = {
  static: 7 * 24 * 60 * 60, // 7 days
  dynamic: 24 * 60 * 60,    // 1 day
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/favicon.ico',
        ]);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('multikeyboard-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }

      // Clone the request because it can only be used once
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response because it can only be used once
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          const url = event.request.url;
          const isStatic = url.includes('/static/') || 
                          url.endsWith('.js') || 
                          url.endsWith('.css') || 
                          url.endsWith('.png') || 
                          url.endsWith('.jpg') || 
                          url.endsWith('.svg');

          // Add response to cache with appropriate expiration
          const expires = Date.now() + (isStatic ? CACHE_DURATION.static : CACHE_DURATION.dynamic) * 1000;
          
          const cachedResponse = new Response(responseToCache.body, {
            headers: {
              ...Array.from(responseToCache.headers.entries()),
              'x-cache-expires': expires.toString(),
            },
          });

          cache.put(event.request, cachedResponse);
        });

        return response;
      });
    })
  );
});