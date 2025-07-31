import './bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (registration) {
    console.log('SW registered successfully!');
  }).catch(function (error) {
    console.log('SW registration failed:', error);
  });
}

// PWA Install Logic
window.installPromptEvent = null;
window.showInstallButton = false;

// Catch beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Prevent the mini-infobar from appearing on mobile
  window.installPromptEvent = e; // Save the event for later
  window.showInstallButton = true;
  console.log('beforeinstallprompt event captured');
});