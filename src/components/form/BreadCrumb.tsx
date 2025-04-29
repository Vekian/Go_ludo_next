"use client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ButtonPrimary from "../ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import { Game } from "@/interfaces";
import { useRouter } from "next/navigation";

export default function BreadCrumb({
  step,
  game,
}: {
  step: number;
  game: Game;
}) {
  const router = useRouter();

  const setStep = (step: number) => {
    router.push(
      `/${game.type === "base" ? "game" : game.type}s/edit/${game.id}/${step}`
    );
  };
  return (
    <div className="flex gap-x-3">
      <div className="flex gap-x-2 items-center">
        <ButtonPrimary
          label="Infos principales"
          color={
            step === 1 ? theme.colors.primary[500] : theme.colors.primary[900]
          }
          onClick={() => setStep(1)}
        />
      </div>
      <div className="flex gap-x-2 items-center">
        <FontAwesomeIcon icon={faChevronRight} />
        <ButtonPrimary
          label="Images du jeu"
          color={
            step === 2 ? theme.colors.primary[500] : theme.colors.primary[900]
          }
          onClick={() => () => setStep(2)}
        />
      </div>
      <div className="flex gap-x-2 items-center">
        <FontAwesomeIcon icon={faChevronRight} />
        <ButtonPrimary
          label="Infos secondaires"
          color={
            step === 3 ? theme.colors.primary[500] : theme.colors.primary[900]
          }
          onClick={() => () => setStep(3)}
        />
      </div>
      <div className="flex gap-x-2 items-center">
        <FontAwesomeIcon icon={faChevronRight} />
        <ButtonPrimary
          label="Créateurs"
          color={
            step === 4 ? theme.colors.primary[500] : theme.colors.primary[900]
          }
          onClick={() => () => setStep(4)}
        />
      </div>
    </div>
  );
}
