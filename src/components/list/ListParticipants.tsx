import React from "react";
import { UserProfil } from "@/interfaces";
import CardParticipant from "../cards/CardParticipant";

export default function ListParticipants({
  participants,
  author,
}: {
  participants: UserProfil[];
  author: UserProfil;
}) {
  return (
    <div className=" flex gap-x-4 gap-5 mt-5 container">
      <CardParticipant participant={author} key={`participant${author.id}`} />
      {participants.map((participant) => (
        <CardParticipant
          participant={participant}
          key={`participant${participant.id}`}
        />
      ))}
    </div>
  );
}
