import { Creator } from "@/interfaces";
import { getImg } from "@/lib/utils";
import { Avatar } from "@mui/material";
import React from "react";

export default function CardCreator({ creator }: { creator: Creator }) {
  return (
    <div className="flex items-center flex-col ml-3">
      <Avatar
        alt={creator.name}
        src={getImg(creator.image)}
        sx={{ width: 50, height: 50 }}
      />
      <h5>{creator.name}</h5>
    </div>
  );
}
