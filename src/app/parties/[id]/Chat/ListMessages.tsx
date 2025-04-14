"use client";

import React from "react";
import { Message } from "@/interfaces/party.interface";
import MessageCard from "./Message/MessageCard";
import { useSession } from "next-auth/react";

export default function ListMessages({
  messages,
}: {
  messages: Message[] | undefined;
}) {
  const { data } = useSession();

  return (
    <div className=" flex flex-col gap-y-6 px-3 py-7 lg:p-10">
      {messages &&
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex  ${
              Number(data?.user.id) === message.author.id
                ? "justify-start"
                : "justify-end"
            }`}
          >
            <div
              className={`w-11/12 lg:w-10/12 ${
                Number(data?.user.id) === message.author.id ? "" : ""
              }`}
            >
              <MessageCard
                message={message}
                author={Number(data?.user.id) === message.author.id}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
