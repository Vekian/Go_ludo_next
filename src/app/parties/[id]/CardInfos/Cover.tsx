import { Party } from "@/interfaces/party.interface";
import Image from "next/image";
import React from "react";

export default function Cover({ party }: { party: Party }) {
  return (
    <div className="flex justify-center w-full sm:w-1/6 pe-3 h-36">
      <div className=" relative w-full ">
        {party.games[0] && (
          <Image
            alt="test"
            src={`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${party.games[0].cover}`}
            fill
            className="object-contain"
          />
        )}
      </div>
    </div>
  );
}
