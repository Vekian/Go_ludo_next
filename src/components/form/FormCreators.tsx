import { Game } from "@/interfaces";
import React from "react";

export default function FormCreators({
  game,
  setStep,
}: {
  game: Game;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return <div>FormCreators</div>;
}
