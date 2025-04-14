import { UserProfil } from "@/interfaces";
import { getImg } from "@/lib/utils";
import { Avatar } from "@mui/material";
import React from "react";

export default function UserInfos({ user }: { user: UserProfil }) {
  return (
    <div className="h-full  flex flex-col items-center me-10 ">
      <div className="w-full max">
        <Avatar
          alt={user.username}
          src={getImg(user.avatar)}
          sx={{ width: 100, height: 100 }}
        />
      </div>
      <p>{user.username}</p>
    </div>
  );
}
