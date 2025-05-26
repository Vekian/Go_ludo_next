import { Game } from "@/interfaces";
import React from "react";

function GameStats({ game }: { game: Game }) {
  return (
    <div
      id="onglet3"
      className="ongletContent z-10 inset-10 absolute opacity-0 translate-x-full transform"
    >
      Les statistiques ne sont pas encore disponibles pour le jeu {game.name}
    </div>
  );
}

export default GameStats;
