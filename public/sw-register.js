if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker зарегистрирован успешно:', registration.scope);
      })
      .catch((error) => {
        console.error('Ошибка при регистрации ServiceWorker:', error);
      });
  });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
});
