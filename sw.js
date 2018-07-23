// Asignar nombre y version de cache
const CACHE_NAME = 'v1_cache_juan_quiroga_pwa';

// Configurar archivos en cache
var urlsToCache = [
    './',
    './index.html',
    './css/styles.css',
    './js/main.js',
    './img/favicon.png',
    './img/favicon-16.png',
    './img/favicon-32.png',
    './img/favicon-64.png',
    './img/favicon-96.png',
    './img/favicon-128.png',
    './img/favicon-192.png',
    './img/favicon-256.png',
    './img/favicon-384.png',
    './img/favicon-512.png',
    './img/favicon-1024.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png'

];

// Evento install
// Instalación del service worker y guardar en cache los recursos estáticos
self.addEventListener('install', e => {
    console.log("Evento de install");
    
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                
                
                return cache.addAll(urlsToCache).then(()=>{
                    self.skipWaiting();
                    console.log("Cache abierto ", cache);
                }).catch(err=>console.log('No se ha registrado el cache',err));
            }).catch(err => {
                console.log("No se ha abierto el cache",err)
                
            })
    );
});

// Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) == -1) {
                        // Borrar los elementos que no se necesitan
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then( () => {            
            // Activar cache actual 
            self.clients.claim();
        })
    );
});

// Evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res=>{
                if(res){
                    // Devolver datos del cache
                    return res;
                } else {
                    return fetch(e.request);
                }
            })
            .catch(e => console.log("No carga el request",e.request,e))
    );
});