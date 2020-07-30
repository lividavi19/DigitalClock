const SW_VERSION = `1`;
const app_cache_name = `digital_clock_app_cache_v${SW_VERSION}`;
const app_static_resources = [
	`.`,
	`index.html`,
	`sounds/clock_ticker.mp3`,
	`sounds/oclock_sound_effect.wav`,
	`img/icons/ic_192.png`,
	`img/icons/ic_512.png`
];

// install event
self.oninstall = e => {
	// console.log(`service worker installed:`, e);
	e.waitUntil(
		caches.open(app_cache_name).then(cache => {
			cache.addAll(app_static_resources);
		})
	);
};

// activate event
self.onactivate = e => {
	e.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => key !== app_cache_name)
				.map(key => caches.delete(key))
			);
		})
	);
};

// fetch event
self.onfetch = e => {
	// console.log(`intercepting fetch request for:`, e);
	e.respondWith(
		caches.match(e.request).then(cached_response => {
			return cached_response || fetch(e.request);
		})
	);
};