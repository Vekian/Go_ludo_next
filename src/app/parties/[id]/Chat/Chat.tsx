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
      if (notif.action === "create") {
        addMessage(notif.message);
      } else if (notif.action === "update") {
        updateMessage(notif.message);
      } else if (notif.action === "delete") {
        deleteMessage(notif.message.id);
      }
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

  const addMessage = (message: Message) => {
    if (messages) {
      setMessages([...messages, message]);
    } else {
      setMessages([message]);
    }
  };

  const updateMessage = (message: Message) => {
    setMessages((prevMessages) => {
      const index = prevMessages.findIndex((m) => m.id === message.id);
      if (index !== -1) {
        const updatedMessages = [...prevMessages];
        updatedMessages[index] = message;
        return updatedMessages;
      }
      return prevMessages;
    });
  };
  const deleteMessage = (messageId: number) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
  };
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
