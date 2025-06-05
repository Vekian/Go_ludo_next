"use client";

import React, { useEffect, useState } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);

    // Envoi à ton API Symfony
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/push-subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sub),
      }
    );

    if (!res.ok) {
      console.error("Erreur abonnement côté API Symfony", await res.text());
    }
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    if (subscription) {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/push-subscriptions?endpoint=${encodeURIComponent(
          subscription.endpoint
        )}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        console.error(
          "Erreur désabonnement côté API Symfony",
          await res.text()
        );
      }
    }
    setSubscription(null);
  }

  async function sendTestNotification() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      console.error("Erreur envoi notification test", await res.text());
    }

    setMessage("");
  }

  if (!isSupported) {
    return (
      <p>Les notifications push ne sont pas supportées par ce navigateur.</p>
    );
  }

  return (
    <div>
      <h3>Notifications Push</h3>
      {subscription ? (
        <>
          <p>Vous êtes abonné(e) aux notifications push.</p>
          <button onClick={unsubscribeFromPush}>Se désabonner</button>
          <input
            type="text"
            placeholder="Message de notification"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>Envoyer</button>
        </>
      ) : (
        <>
          <p>Vous n&apos;êtes pas abonné(e) aux notifications push.</p>
          <button onClick={subscribeToPush}>S&apos;abonner</button>
        </>
      )}
    </div>
  );
}
