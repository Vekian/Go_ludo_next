"use client";
import React from "react";
import { Message } from "@/interfaces/party.interface";
import { getRelativeTime } from "@/lib/date";
import MessageCardActions from "./MessageCardActions";
import { Avatar } from "@mui/material";
import { getImg } from "@/lib/utils";
import Link from "next/link";

export default function MessageCard({
  message,
  author,
}: {
  message: Message;
  author: boolean;
}) {
  return (
    <div
      className={`${
        author
          ? "flex bg-secondary-100"
          : "flex flex-row-reverse bg-primary-100"
      } gap-x-6 rounded-lg py-3`}
    >
      <div className="w-2/12 flex flex-col items-center -mt-8">
        <Link
          href={`/users/${message.author.id}`}
          className="flex flex-col items-center"
        >
          <div className=" overflow-hidden rounded-full ">
            <Avatar
              alt={message.author.username}
              src={getImg(message.author.avatar)}
              sx={{ width: 65, height: 65 }}
            />
          </div>
          <p>{message.author.username}</p>{" "}
        </Link>
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
          <p className="text-xs lg:text-sm">
            {getRelativeTime(message.createdAt)}
          </p>
          <MessageCardActions message={message} author={author} />
        </div>

        <p>{message.content}</p>
      </div>
    </div>
  );
}
