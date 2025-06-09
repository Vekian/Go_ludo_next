import { getSimilarGames } from "@/lib/api/server/game";
import React from "react";
import ListGames from "@/components/list/ListGames";
import { Game } from "@/interfaces";

export default async function SimilarGames({ game }: { game: Game }) {
  const gamesList = await getSimilarGames(game.id);

  if (!gamesList.data) {
    throw new Error("No games found");
  }

  return (
    <div className="mt-4 sm:pl-10 sm:pr-10 px-1">
      <div>
        <h2>Jeux similaires</h2>
        <ListGames games={gamesList.data} keyName="similar" />
      </div>
    </div>
  );
}
