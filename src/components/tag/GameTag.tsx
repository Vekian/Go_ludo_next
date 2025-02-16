import { GameListItem } from "@/interfaces";
import React from "react";

export default function GameTag({ game }: { game: Partial<GameListItem> }) {
  return (
    <div className="bg-neutral-500 text-white px-5 py-0.5 rounded-full">
      {game.name}
    </div>
  );
}
