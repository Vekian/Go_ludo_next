import { GameListItem } from "@/interfaces";
import React from "react";
import CardGame from "../cards/CardGame";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function ListGames({
  games,
  key = "base",
}: {
  games: GameListItem[];
  key?: string;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-6 gap-5 mt-5">
      {games.map((game: GameListItem) => (
        <div key={`${game.id}list${key}`}>
          <CardGame game={game} logged={session ? true : false} />
        </div>
      ))}
    </div>
  );
}

export default ListGames;
