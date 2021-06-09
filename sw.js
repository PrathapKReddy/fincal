const cacheName = 'news-v1';
const staticAssets = [
  './',
  '/index.html',
  '/pages/compoundinterest.html',
  '/pages/contact.html',
  '/pages/fixeddeposit.html',
  '/pages/goal.html',
  '/pages/home.html',
  '/pages/homeloan.html',
  '/pages/Lumpsum.html',
  '/pages/personalloan.html',
  '/pages/rateus.html',
  '/pages/recurringdeposit.html',
  '/pages/retirement.html',
  '/pages/share.html',
  '/pages/simpleinterest.html',
  '/pages/sip.html',
  '/pages/thankyou.html',

  '/components/footer.html',
  '/components/header.html',
  '/components/rightSideBar.html',

   '/css/style.css',
   '/scipts/functions.js',
   '/scripts/universal.js',

];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}