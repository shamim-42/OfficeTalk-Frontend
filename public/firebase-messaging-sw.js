// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDzrYOWQGRndiN4I1QCZJRUPMhr5wZWIfk",
  authDomain: "car-mechanic-985f5.firebaseapp.com",
  projectId: "car-mechanic-985f5",
  storageBucket: "car-mechanic-985f5.appspot.com",
  messagingSenderId: "1084209587761",
  appId: "1:1084209587761:web:49066bb1d555165b731710"
};


firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});