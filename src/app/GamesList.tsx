import ListGames from "@/components/list/ListGames";
import { getGames } from "@/lib/api/api";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";

async function GamesList({
  searchParams,
}: {
  searchParams: Promise<{
    category: string | string[];
    theme: string | string[];
    mode: string | string[];
  }>;
}) {
  const session = await getServerSession(authOptions);
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
  const games = await getGames(
    [
      {
        key: "category[]",
        value: categoryParams,
      },
    ],
    session && session.user
  );
  return <ListGames games={games} />;
}

export default GamesList;
