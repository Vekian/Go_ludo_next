"use client";
import React, { useEffect, useRef, useState } from "react";
import ListMessages from "./ListMessages";
import InputChat from "./InputChat";
import { Message, Party } from "@/interfaces/party.interface";

export default function Chat({ party }: { party: Party }) {
  const [messages, setMessages] = useState<Message[]>(party.messages ?? []);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/.well-known/mercure?topic=/party/${party.id}/messages&authorization=${party.token}`);
  eventSource.onmessage = (event) => {
    console.log('New message:', event.data);
  };
  useEffect(() => {
    // Scrolle en bas à chaque mise à jour des messages
    if (chatEndRef?.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/.well-known/mercure`;
    const topic = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_URL}/messages/${party.id}`
    );
    const eventSource = new EventSource(`${url}?topic=${topic}`);

    eventSource.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const addMessage = (message: Message) => {
    if (messages) {
      setMessages([...messages, message]);
    } else {
      setMessages([message]);
    }
  };
  return (
    <div className="flex flex-col w-full h-full gap-y-3 sm:gap-y-6">
      <div className="bg-white rounded-lg  h-4/5 overflow-y-scroll">
        <ListMessages messages={messages} />
        <div ref={chatEndRef} />
      </div>
      <div className="bg-white rounded-lg h-1/5 mb-1">
        <InputChat party={party} addMessage={addMessage} />
      </div>
    </div>
  );
}
