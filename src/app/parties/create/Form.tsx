"use client";
import { GameCategory, GameListItem } from "@/interfaces";
import React, { useState } from "react";
import FormInfosParty from "./FormInfosParty";
import FormLocalisationParty from "./FormLocalisationParty";
import FormGame from "./FormGame";

export default function Form({
  categories,
  themes,
  modes,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
}) {
  const [games, setGames] = useState<GameListItem[] | null>(null);

  const addGame = (game: GameListItem) => {
    if (!games) {
      setGames([game]);
    } else {
      setGames([...games, game]);
    }
  };

  const removeGame = (game: GameListItem) => {
    if (!games) return;

    setGames(games.filter((g) => g.id !== game.id));
  };
  return (
    <div className="w-full flex flex-col gap-y-6">
      <FormInfosParty />
      <FormLocalisationParty />
      <FormGame
        categories={categories}
        themes={themes}
        modes={modes}
        gamesAdd={games}
        addGame={addGame}
        removeGame={removeGame}
      />
    </div>
  );
}
