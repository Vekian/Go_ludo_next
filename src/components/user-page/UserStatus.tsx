"use client";
import { UserProfil } from "@/interfaces";
import { getImg } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import ButtonImage from "../button/ButtonImage";

function UserStatus({ user }: { user: UserProfil }) {
  const [sourceState, setSourceState] = useState(getImg(user.avatar));
  return (
    <div className="flex flex-col items-center -mt-28">
      {user.avatar && (
        <Image
          src={sourceState}
          alt={user.username}
          width={150}
          height={150}
          className="rounded-full"
        />
      )}

      <ButtonImage setSourceState={setSourceState} user={user} />
      <h3 className="text-center">{user.username}</h3>
    </div>
  );
}

export default UserStatus;
