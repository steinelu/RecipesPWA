const cacheName = 'RecipesPAW'

self.addEventListener('install', event => {
	event.waitUntil(
		caches
		.open(cacheName)
		.then(cache => {
			return cache.addAll(['./', './index.html', './manifest.json']);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches
		.open(cacheName)
		.then(cache => cache.match(event.request, {ignoreSearch: true}))
		.then(response => {
			return response || fetch(event.request)
		})
	);
});