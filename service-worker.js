const CACHE_NAME = 'color-lab-cache-v1';
const urlsToCache = [
    // فایل‌های اصلی
    '/',
    'index.html',
    'css/bootstrap.min.css',
    'css/style.css',
    'js/bootstrap.bundle.min.js',
    'js/culori.min.js',
    'manifest.json',

    // آیکون‌ها
    'icon-192.png',
    'icon-512.png',

    // فایل‌های CDN
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// نصب سرویس ورکر و کش کردن فایل‌ها
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// پاسخ به درخواست‌ها از طریق کش (Cache-First Strategy)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // اگر فایل در کش بود، از کش برگردان
                if (response) {
                    return response;
                }
                // در غیر این صورت، از شبکه دریافت کن
                return fetch(event.request);
            })
    );
});

// حذف کش‌های قدیمی در زمان فعال‌سازی نسخه جدید
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

});
