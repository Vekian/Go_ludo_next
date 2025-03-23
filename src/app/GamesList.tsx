import ListGames from "@/components/list/ListGames";
import ArrowPaginator from "@/components/list/pagination/ArrowPaginator";
import { GameListItem } from "@/interfaces";
import { ListPaginated } from "@/interfaces/paginator.interface";
import { getGames } from "@/lib/api/server/game";
import React from "react";

async function GamesList({
  searchParams,
}: {
  searchParams: Promise<{
    category: string | string[];
    theme: string | string[];
    mode: string | string[];
    sort: string;
    time: string;
    page: string;
  }>;
}) {
  const params = await searchParams;
  const toArray = (param: string | string[]): string[] => {
    if (param === undefined) return [];
    return Array.isArray(param) ? param : [param];
  };
  const categoryParams = [
    ...toArray(params.category),
    ...toArray(params.theme),
    ...toArray(params.mode),
  ];
  const gamesList: ListPaginated<GameListItem> = await getGames([
    {
      key: "category[]",
      value: categoryParams,
    },
    {
      key: "sort",
      value: params.sort,
    },
    {
      key: "time",
      value: params.time,
    },
    {
      key: "page",
      value: params.page,
    },
  ]);
  return (
    <div className="relative flex">
      {gamesList.items.length > 0 ? (
        <>
          {gamesList.page > 1 && <ArrowPaginator type="prev" />}
          <ListGames games={gamesList.items} />
          {gamesList.page < gamesList.totalPages && (
            <ArrowPaginator type="next" />
          )}
        </>
      ) : (
        <div className="w-full flex justify-center items-center h-36">
          <h2>Aucun jeu trouvé.</h2>
        </div>
      )}
    </div>
  );
}

export default GamesList;
