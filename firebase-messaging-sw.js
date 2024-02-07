importScripts("https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.2/firebase-messaging.js");

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  // databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  vapidKey:
    "BNAE5i86BYia-wNgusgYqpV1UQvq2J_jB8zr52KDj-Q0P3GXPuGnnF7XcdIM0RzMjRKRJiraRl4d7zF-ru2wSKA", // Add your VAPID key here
};

firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle incoming messages
messaging.onMessage((payload) => {
  console.log("Message received:", payload);

  // Display the notification
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
