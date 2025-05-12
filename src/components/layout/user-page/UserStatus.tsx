"use client";
import { User } from "@/interfaces";
import { getImg } from "@/lib/utils";
import React, { useState } from "react";
import ButtonImage from "@/components/ui/button/ButtonImage";
import { Avatar } from "@mui/material";

function UserStatus({ user, edit = true }: { user: User; edit?: boolean }) {
  const [sourceState, setSourceState] = useState(getImg(user.avatar));
  return (
    <div className="flex flex-col justify-around items-center -mt-28">
      <div className="flex flex-col items-center">
        <div className="w-36  h-36">
          <Avatar
            alt={user.username}
            src={sourceState}
            sx={{ width: "100%", height: "100%" }}
          />
        </div>
        {edit && (
          <ButtonImage
            setSourceState={setSourceState}
            user={user}
            id="avatar"
          />
        )}
      </div>

      <h3 className="text-center mt-3">{user.username}</h3>
    </div>
  );
}

export default UserStatus;
