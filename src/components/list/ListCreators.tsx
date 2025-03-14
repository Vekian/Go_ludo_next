import { GameCreator } from "@/interfaces";
import { getImg } from "@/lib/utils";
import { Avatar } from "@mui/material";
import React from "react";

export default function ListCreators({
  creators,
  title,
}: {
  creators: GameCreator[];
  title: string;
}) {
  return (
    <div className="flex flex-col flex-1">
      <h4>{title}</h4>
      <div className="flex mt-2">
        {creators.map((creator) => (
          <div className="flex items-center flex-col ml-3" key={creator.id}>
            <Avatar
              alt={creator.name}
              src={getImg(creator.image)}
              sx={{ width: 50, height: 50 }}
            />
            <h5>{creator.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}
