import CardGame from "@/components/card/CardGame";
import { GameCard } from "@/interfaces";
import { getGames } from "@/lib/api";
import Link from "next/link";
import React from "react";

async function GamesList({
  searchParams,
}: {
  searchParams: Promise<{ category: string | string[] }>;
}) {
  const games = await getGames([
    {
      key: "category[]",
      value: (await searchParams).category,
    },
  ]);
  return (
    <div className="container grid grid-cols-6 gap-5 mt-5">
      {games.map((game: GameCard) => (
        <Link key={game.id} href={`/games/${game.id}`}>
          <CardGame game={game} />
        </Link>
      ))}
    </div>
  );
}

export default GamesList;
