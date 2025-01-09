import CardGame from "@/components/card/CardGame";
import { Game, GameCard } from "@/interfaces";
import { getGames } from "@/lib/api";
import Link from "next/link";
import React from "react";

export default async function SimilarGames({ game }: { game: Game }) {
  const games: GameCard[] = await getGames();

  return (
    <div className="mt-4 pl-10 pr-10">
      {game.extensions && (
        <div>
          <h2>Extensions</h2>
          <div className="grid grid-cols-6">
            {game.extensions.map((extension) => (
              <Link key={extension.id} href={`/extensions/${extension.id}`}>
                <CardGame game={extension} />
              </Link>
            ))}
          </div>
        </div>
      )}
      <div>
        <h2>Jeux similaires</h2>
        <div className="grid grid-cols-6">
          {games.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <CardGame game={game} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
