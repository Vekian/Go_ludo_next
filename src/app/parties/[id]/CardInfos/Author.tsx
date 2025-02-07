import { Party } from "@/interfaces/party.interface";
import Image from "next/image";
import React from "react";

export default function Author({ party }: { party: Party }) {
  return (
    <div className="h-full w-1/6 flex flex-col items-center me-10 ">
      <div className="h-36 relative w-full max-w-36  ">
        <Image
          alt="test"
          src={`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/images/users/4/pngwing-com-679f870e30a42280699838.png`}
          fill
          className="object-contain"
        />
      </div>
      <p>{party.author.username}</p>
    </div>
  );
}
