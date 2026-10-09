importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBl6yDNWpHE5AwltvoyhcYB295gdfmVYjM",
  authDomain: "chat-app-notifications-b8e2d.firebaseapp.com",
  projectId: "chat-app-notifications-b8e2d",
  storageBucket: "chat-app-notifications-b8e2d.firebasestorage.app",
  messagingSenderId: "152551413573",
  appId: "1:152551413573:web:1e123095c08023833b102c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || 'Incoming Glass Call / Message';
  const notificationOptions = {
    body: payload.notification?.body || 'New live activity in your chat workspace.',
    icon: '/icon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
