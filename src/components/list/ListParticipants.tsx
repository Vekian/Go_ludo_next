import React from "react";
import { UserProfil } from "@/interfaces";
import CardParticipant from "../card/CardParticipant";

export default function ListParticipants({
  participants,
}: {
  participants: UserProfil[];
}) {
  return (
    <div className=" flex gap-x-4 gap-5 mt-5 container">
      {participants.map((participant) => (
        <CardParticipant
          participant={participant}
          key={`participant${participant.id}`}
        />
      ))}
    </div>
  );
}
