"use client";
import React from "react";
import MessageEdit from "./MessageEdit";
import { Message } from "@/interfaces/party.interface";
import MessageDelete from "./MessageDelete";

export default function MessageCardActions({
  message,
  author,
}: {
  message: Message;
  author: boolean;
}) {
  return (
    <div className="flex gap-x-2">
      {author && (
        <>
          <MessageEdit message={message} />
          <MessageDelete message={message} />
        </>
      )}
    </div>
  );
}
