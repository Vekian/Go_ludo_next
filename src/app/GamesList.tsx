import ListGames from "@/components/list/ListGames";
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
  return <ListGames gameList={gamesList} />;
}

export default GamesList;
