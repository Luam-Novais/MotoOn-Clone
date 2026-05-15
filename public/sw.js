self.addEventListener('push', (event) => {
    let data = {
      title: 'Nova notificação',
      body: 'Mensagem recebida',
    };

    try {
      if (event.data) {
        data = event.data.json();
      }
    } catch (err) {
      console.error(err);
    }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
    }),
  );
});
