"use client";
import React from "react";
import { Game } from "@/interfaces";
import TabsCustom from "../ui/tab/TabsCustom";
import BreadCrumbElm from "./BreadCrumbElm";

export default function BreadCrumb({
  step,
  game,
}: {
  step: number;
  game: Game;
}) {
  return (
    <TabsCustom>
      <BreadCrumbElm
        step={1}
        game={game}
        label="Infos principales"
        first
        active={step === 1}
      />
      <BreadCrumbElm
        step={2}
        game={game}
        label="Images du jeu"
        active={step === 2}
      />
      <BreadCrumbElm
        step={3}
        game={game}
        label="Infos secondaires"
        active={step === 3}
      />
      <BreadCrumbElm
        step={4}
        game={game}
        label="Créateurs"
        active={step === 4}
      />
    </TabsCustom>
  );
}
