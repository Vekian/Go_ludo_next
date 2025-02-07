import { UserProfil } from "@/interfaces";
import { getImg } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function CardParticipant({
  participant,
}: {
  participant: UserProfil;
}) {
  return (
    <div className="bg-white rounded-lg p-3 flex flex-col items-center">
      <div className="h-28 relative w-28 max-w-36 ">
        <Image
          alt="test"
          src={getImg(`/images/users/${participant.id}/${participant.avatar}`)}
          fill
          className="object-contain"
        />
      </div>
      <p>{participant.username}</p>
    </div>
  );
}
