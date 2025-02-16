import { GameListItem } from "@/interfaces";
import React from "react";
import CardGame from "../card/CardGame";

function ListGames({ games }: { games: GameListItem[] }) {
  return (
    <div className="container grid grid-cols-6 gap-5 mt-5">
      {games.map((game: GameListItem) => (
        <CardGame game={game} key={`${game.id}list`} />
      ))}
    </div>
  );
}

export default ListGames;
