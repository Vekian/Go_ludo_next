"use server";

import webpush from "web-push";

type ServerPushSubscription = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};
webpush.setVapidDetails(
  "mailto:mathieu2991@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscription: ServerPushSubscription | null = null;

export async function subscribeUser(sub: ServerPushSubscription) {
  subscription = sub;
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Notification",
        body: message,
        icon: "/web-app-manifest-192x192.png",
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
