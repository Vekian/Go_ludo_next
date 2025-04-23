import React from "react";
import FormGame from "@/components/form/FormGame";
import { GameDetails } from "@/interfaces";
import { getGame } from "@/lib/api/server/game";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams: Promise<{
    step: number;
  }>;
}) {
  const id = (await params).id;
  const gameData: GameDetails = await getGame(id, "base");
  const game = gameData.game;

  const stepParams = await searchParams;
  const step = stepParams.step;
  return (
    <div className="lg:p-4 pt-10 flex flex-col gap-y-6">
      <div className="flex flex-col bg-white rounded-lg flex-wrap p-10  items-center gap-y-6">
        <div>
          <h2>Modifier une fiche de jeu</h2>
        </div>
      </div>
      <FormGame game={game} initialStep={step} />
    </div>
  );
}
