import React from "react";
import FormGame from "@/components/form/FormGame";
import { GameDetails } from "@/interfaces";
import { getGame } from "@/lib/api/server/game";

export default async function page({
  params,
}: {
  params: Promise<{ id: number; step: number }>;
}) {
  const id = (await params).id;
  const step = (await params).step;
  const gameData: GameDetails = await getGame(id, "base");
  const game = gameData.game;
  return (
    <div className="lg:p-4 pt-10 flex flex-col gap-y-6">
      <div className="flex flex-col bg-white rounded-lg flex-wrap p-10  items-center gap-y-6">
        <div>
          <h2>Modifier une fiche de jeu</h2>
        </div>
      </div>
      <FormGame game={game} step={step} />
    </div>
  );
}
