import { Game, GameListItem } from "@/interfaces";
import { getGames } from "@/lib/api/api";
import React from "react";
import ListGames from "../list/ListGames";

export default async function SimilarGames({ game }: { game: Game }) {
  const games: GameListItem[] = await getGames();

  return (
    <div className="mt-4 pl-10 pr-10">
      {game.extensions && (
        <div>
          <h2>Extensions</h2>
          <ListGames games={game.extensions} />
        </div>
      )}
      <div>
        <h2>Jeux similaires</h2>
        <ListGames games={games} />
      </div>
    </div>
  );
}
