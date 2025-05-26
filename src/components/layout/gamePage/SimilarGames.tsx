import { getGames } from "@/lib/api/server/game";
import React from "react";
import ListGames from "@/components/list/ListGames";

export default async function SimilarGames() {
  const gamesList = await getGames();

  if (!gamesList.data) {
    throw new Error("No games found");
  }

  return (
    <div className="mt-4 sm:pl-10 sm:pr-10 px-1">
      <div>
        <h2>Jeux similaires</h2>
        <ListGames games={gamesList.data.items} keyName="similar" />
      </div>
    </div>
  );
}
