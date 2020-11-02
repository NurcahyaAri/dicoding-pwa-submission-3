importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
// import {
//     precacheAndRoute
// } from 'workbox-precaching';
// workbox.precaching.precacheAndRoute(self.__precacheManifest);


if (workbox) {
    console.log(`Workbox berhasil dimuat`);

    // precaching 
    // workbox.core.skipWaiting();
    // workbox.precaching.precacheAndRoute([]); 
    workbox.precaching.precacheAndRoute([
        {
            url: 'assets/img/logo.jpg',
            revision: 1
        },
        {
            url: 'assets/img/logo64.png',
            revision: 1
        },
        {
            url: 'assets/img/logo128.png',
            revision: 1
        },
        {
            url: 'assets/img/logo256.png',
            revision: 1
        },
        {
            url: 'assets/img/logo512.png',
            revision: 1
        },
        {
            url: 'assets/js/idb.js',
            revision: 1
        },
        {
            url: 'main.css',
            revision: 1
        },
        {
            url: 'assets/',
            revision: 1
        },
        {
            url: 'manifest.json',
            revision: 1
        },
        {
            url: 'index.html',
            revision: 1,
        },
        {
            url: 'sw.js',
            revision: 1,
        }
    ]);

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    );


    workbox.routing.registerRoute(
        new RegExp('https://cors-anywhere.herokuapp.com/https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate()
    );

    // Caching Google Fonts
    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );

    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'static-resources',
        })
    );
} else {
    console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', (event) => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options),
    );
});
