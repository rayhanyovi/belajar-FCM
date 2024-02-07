// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCc45XPblYsHUO2NV7XtK0iZvnZkdRNQdo",
  authDomain: "test-next-1fc93.firebaseapp.com",
  projectId: "test-next-1fc93",
  storageBucket: "test-next-1fc93.appspot.com",
  messagingSenderId: "911109316740",
  appId: "1:911109316740:web:b0144acec9caf436e922d1",
  measurementId: "G-9BH23GDLF2",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./vercel.svg",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
