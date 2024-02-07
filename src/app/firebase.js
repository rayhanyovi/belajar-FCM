import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
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

const app = initializeApp(firebaseConfig);
export const fcm = getMessaging(app);

export async function requestPermission() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    return getFCMToken();
  } else {
    return null;
  }
}

export async function getFCMToken() {
  try {
    const token = await fcm.getToken();
    console.log("FCM token generated:", token);
    return token;
  } catch (error) {
    console.error("Error generating FCM token:", error);
    throw new Error("Error generating FCM token.");
  }
}

onMessage(fcm, (payload) => {
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(
        payload.notification.title,
        notificationOptions
      );
    });
  }
});

export default app;
