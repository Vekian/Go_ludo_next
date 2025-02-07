import { Party } from "@/interfaces/party.interface";
import Image from "next/image";
import React from "react";

export default function Cover({ party }: { party: Party }) {
  return (
    <div className="flex justify-center w-1/6">
      <div className="h-56 relative w-full max-w-36 ">
        {party.games[0] && (
          <Image
            alt="test"
            src={`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${party.games[0].cover?.filepath}`}
            fill
            className="object-contain"
          />
        )}
      </div>
    </div>
  );
}
