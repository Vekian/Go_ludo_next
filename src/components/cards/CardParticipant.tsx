import { UserStatus } from "@/interfaces";
import { getImg } from "@/lib/utils";
import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function CardParticipant({
  participant,
}: {
  participant: UserStatus;
}) {
  return (
    <Link href={`/users/${participant.id}`}>
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-y-3 drop-shadow-lg hover:bg-primary-50">
        <div className="h-20  w-20 max-w-36 ">
          <Avatar
            alt={participant.username}
            src={getImg(participant.avatar)}
            sx={{ width: "100%", height: "100%" }}
          />
        </div>
        <p>{participant.username}</p>
      </div>
    </Link>
  );
}
