"use client";
import React, { useEffect, useRef } from "react";
import ListMessages from "./ListMessages";
import InputChat from "./InputChat";
import { Message, Party } from "@/interfaces/party.interface";

export default function Chat({
  party,
  messages,
}: {
  party: Party;
  messages: Message[];
}) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scrolle en bas à chaque mise à jour des messages
    if (chatEndRef?.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-full gap-y-3 sm:gap-y-6">
      <div className="bg-white rounded-lg overflow-y-scroll">
        <ListMessages messages={messages} />
        <div ref={chatEndRef} />
      </div>
      <div className="bg-white rounded-lg min-h-36 lg:min-h-48 mb-1">
        <InputChat party={party} />
      </div>
    </div>
  );
}
