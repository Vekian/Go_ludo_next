import { Message } from "./party.interface";
export interface ChatMessageNotification {
  message: Message;
  action: "create" | "update" | "delete";
}

export interface NotificationsInit {
  token: string;
  notifications: Notification[];
}

export interface Notification {
  id: number;
  content: string;
  read: boolean;
  targetId: number;
  action: "chat_party" | "join_party" | "leave_party" | "delete_party";
  createdAt: string;
}
