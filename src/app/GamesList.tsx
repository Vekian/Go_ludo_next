import CardGame from "@/components/card/CardGame";
import { GameCard } from "@/interfaces";
import { getGames } from "@/lib/api";
import Link from "next/link";
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
    <div className="container grid grid-cols-6 gap-5 mt-5">
      {games.map((game: GameCard) => (
        <Link key={`${game.id}list`} href={`/games/${game.id}`}>
          <CardGame game={game} />
        </Link>
      ))}
    </div>
  );
}

export default GamesList;
