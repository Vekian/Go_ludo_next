"use client";
import { UserProfil } from "@/interfaces";
import { getImg } from "@/lib/utils";
import React, { useState } from "react";
import ButtonImage from "@/components/ui/button/ButtonImage";
import { Avatar } from "@mui/material";

function UserStatus({ user }: { user: UserProfil }) {
  const [sourceState, setSourceState] = useState(getImg(user.avatar));
  return (
    <div className="flex flex-col justify-around items-center -mt-28">
      <div className="flex flex-col items-center">
        {user.avatar && (
          <div className="w-36  h-36">
            <Avatar
              alt={user.username}
              src={sourceState}
              sx={{ width: "100%", height: "100%" }}
            />
          </div>
        )}

        <ButtonImage setSourceState={setSourceState} user={user} id="avatar" />
      </div>

      <h3 className="text-center">{user.username}</h3>
    </div>
  );
}

export default UserStatus;
