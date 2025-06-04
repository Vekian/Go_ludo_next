import { Notification } from "@/interfaces/notification.interface";

export function handleUrlNotification(notification: Notification) {
  switch (notification.action) {
    case "chat_party":
      return `/parties/${notification.targetId}`;
    case "join_party":
      return `/parties/${notification.targetId}`;
    case "leave_party":
      return `/party/${notification.targetId}`;
    case "delete_party":
      return `/`;
    default:
      return "/"; // fallback au cas où l'action est inconnue
  }
}
