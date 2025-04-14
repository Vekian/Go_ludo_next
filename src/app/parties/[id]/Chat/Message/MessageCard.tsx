"use client";
import React, { useState } from "react";
import { Message } from "@/interfaces/party.interface";
import { getRelativeTime } from "@/lib/date";
import MessageCardActions from "./MessageCardActions";
import { Avatar } from "@mui/material";
import { getImg } from "@/lib/utils";

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
        <div className=" overflow-hidden rounded-full ">
          <Avatar
            alt={message.author.username}
            src={getImg(message.author.avatar)}
            sx={{ width: 65, height: 65 }}
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
          <small>{getRelativeTime(message.createdAt)}</small>
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
