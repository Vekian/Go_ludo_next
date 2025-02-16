import { GameDetails, GameListItem } from "@/interfaces";
import { getGames } from "@/lib/api/api";
import React from "react";
import ListGames from "../list/ListGames";
import { ListPaginated } from "@/interfaces/paginator.interface";

export default async function SimilarGames({
  gameData,
}: {
  gameData: GameDetails;
}) {
  const gamesList: ListPaginated<GameListItem> = await getGames();

  return (
    <div className="mt-4 pl-10 pr-10">
      {gameData.extensions && (
        <div>
          <h2>Extensions</h2>
          <ListGames games={gameData.extensions} />
        </div>
      )}
      <div>
        <h2>Jeux similaires</h2>
        <ListGames games={gamesList.items} />
      </div>
    </div>
  );
}
