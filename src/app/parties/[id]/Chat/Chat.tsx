"use client";
import React, { useEffect, useRef, useState } from "react";
import ListMessages from "./ListMessages";
import InputChat from "./InputChat";
import { Message, Party } from "@/interfaces/party.interface";
import { EventSourcePolyfill } from "event-source-polyfill";
import { ChatMessageNotification } from "@/interfaces/notification.interface";

export default function Chat({ party }: { party: Party }) {
  const [messages, setMessages] = useState<Message[]>(party.messages ?? []);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_MERCURE_URL}?topic=/party/${party.id}/messages`,
      {
        headers: {
          Authorization: `Bearer ${party.token}`,
        },
      }
    );

    eventSource.onmessage = (event) => {
      const notif: ChatMessageNotification = JSON.parse(event.data);

      setMessages((prevMessages) => {
        if (notif.action === "create") {
          return [...prevMessages, notif.message];
        } else if (notif.action === "update") {
          return prevMessages.map((m) =>
            m.id === notif.message.id ? notif.message : m
          );
        } else if (notif.action === "delete") {
          return prevMessages.filter((m) => m.id !== notif.message.id);
        } else {
          return prevMessages;
        }
      });
    };

    return () => {
      eventSource.close();
    };
  }, [party.id, party.token]);

  useEffect(() => {
    // Scrolle en bas à chaque mise à jour des messages
    if (chatEndRef?.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-full gap-y-3 sm:gap-y-6">
      <div className="bg-white rounded-lg  h-4/5 overflow-y-scroll">
        <ListMessages messages={messages} />
        <div ref={chatEndRef} />
      </div>
      <div className="bg-white rounded-lg h-1/5 mb-1">
        <InputChat party={party} />
      </div>
    </div>
  );
}
