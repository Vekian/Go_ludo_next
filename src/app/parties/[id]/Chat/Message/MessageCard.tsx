"use client";
import React, { useState } from "react";
import { Message } from "@/interfaces/party.interface";
import Image from "next/image";
import { getRelativeTime } from "@/lib/date";
import MessageCardActions from "./MessageCardActions";

export default function MessageCard({
  message,
  author,
}: {
  message: Message;
  author: boolean;
}) {
  const [content, setContent] = useState<string>(message.content);
  return (
    <div
      className={`${
        author
          ? "flex bg-secondary-100"
          : "flex flex-row-reverse bg-primary-100"
      } gap-x-6 rounded-lg py-3`}
    >
      <div className="w-2/12 flex flex-col items-center -mt-8">
        <div className="w-[65px] h-[65px] overflow-hidden rounded-full relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${message.author.avatar}`}
            alt="Description de l'image"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <p>{message.author.username}</p>
      </div>
      <div
        className={`w-10/12 flex flex-col gap-y-1 pr-3 ${
          author ? "items-start" : "items-end pl-3"
        }`}
      >
        <div
          className={`flex w-full justify-between ${
            !author && "flex-row-reverse"
          }`}
        >
          <p>{getRelativeTime(message.createdAt)}</p>
          <MessageCardActions
            message={message}
            setContent={setContent}
            author={author}
          />
        </div>

        <p>{content}</p>
      </div>
    </div>
  );
}
