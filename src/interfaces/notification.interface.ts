import { Message } from "./party.interface";

export interface ChatMessageNotification {
  message: Message;
  action: "create" | "update" | "delete";
}
