"use client";

import { useState } from "react";
import { getFCMToken, fcm } from "./firebase";

function FCMButton() {
  const [token, setToken] = useState("");

  const handleClick = async () => {
    if (Notification.permission === "granted") {
      try {
        const token = await getFCMToken();
        setToken(token);
      } catch (error) {
        setToken("Error generating FCM token.");
      }
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          getFCMToken().then(setToken).catch(setToken);
        } else {
          setToken("Permission denied. Can't generate Instance ID token.");
        }
      });
    }
  };

  return (
    <button onClick={handleClick} className="bg-blue-700 px-4 py-2 rounded">
      {token ? "FCM Token: " + token : "Request FCM Permission"}
    </button>
  );
}

export default FCMButton;
