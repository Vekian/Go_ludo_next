import ListGames from "@/components/list/ListGames";
import { getGames } from "@/lib/api/api";
import React from "react";

async function GamesList({
  searchParams,
}: {
  searchParams: Promise<{
    category: string | string[];
    theme: string | string[];
    mode: string | string[];
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
  const games = await getGames([
    {
      key: "category[]",
      value: categoryParams,
    },
  ]);
  return (
    <>
      <ListGames games={games} />
    </>
  );
}

export default GamesList;
