self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Новое уведомление';
    const options = {
        body: data.body || 'У вас новое сообщение',
        // icon: '/icons/icon-192x192.png' // Если нужно, можно добавить иконку
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