import CardGame from "@/components/card/CardGame";
import { GameCard } from "@/interfaces";
import { getGames } from "@/lib/api";
import Link from "next/link";
import React from "react";

async function GamesList() {
  const games: GameCard[] = await getGames();
  return (
    <div className="container grid grid-cols-6">
      {games.map((game) => (
        <Link key={game.id} href={`/games/${game.id}`}>
          <CardGame game={game} />
        </Link>
      ))}
    </div>
  );
}

export default GamesList;
