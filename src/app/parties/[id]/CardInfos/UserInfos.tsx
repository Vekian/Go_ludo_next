import { UserProfil } from "@/interfaces";
import { getImg } from "@/lib/utils";
import { Avatar } from "@mui/material";
import React from "react";

export default function UserInfos({ user }: { user: UserProfil }) {
  return (
    <div className="h-full w-2/6 sm:w-1/6 flex flex-col items-center ">
      <div className="w-14 sm:w-20 lg:w-24 h-14 sm:h-20 lg:h-24 flex justify-center">
        <Avatar
          alt={user.username}
          src={getImg(user.avatar)}
          sx={{ width: "100%", height: "100%" }}
        />
      </div>
      <p>{user.username}</p>
    </div>
  );
}
