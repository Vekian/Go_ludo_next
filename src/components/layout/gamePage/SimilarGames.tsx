import { GameListItem } from "@/interfaces";
import { getGames } from "@/lib/api/server/game";
import React from "react";
import ListGames from "@/components/list/ListGames";
import { ListPaginated } from "@/interfaces/paginator.interface";

export default async function SimilarGames() {
  const gamesList: ListPaginated<GameListItem> = await getGames();

  return (
    <div className="mt-4 sm:pl-10 sm:pr-10 px-1">
      <div>
        <h2>Jeux similaires</h2>
        <ListGames games={gamesList.items} keyName="similar" />
      </div>
    </div>
  );
}
