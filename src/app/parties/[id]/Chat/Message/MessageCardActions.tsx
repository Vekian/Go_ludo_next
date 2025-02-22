import React from "react";
import MessageEdit from "./MessageEdit";
import { Message } from "@/interfaces/party.interface";

export default function MessageCardActions({
  message,
  setContent,
}: {
  message: Message;
  setContent: (content: string) => void;
}) {
  return (
    <div className="flex">
      <MessageEdit message={message} setContent={setContent} />
    </div>
  );
}
