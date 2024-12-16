self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Новое уведомление';
    const options = {
        body: data.body || 'У вас новое сообщение.',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
    };
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});