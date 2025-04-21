"use client";
import FormImage from "./FormImage";
import FormInfos from "@/components/form/FormInfos";
import React, { useState } from "react";
import FormInfosSec from "./FormInfosSec";
import BreadCrumb from "./BreadCrumb";
import { Game } from "@/interfaces";
import FormCreators from "./FormCreators";

export default function FormGame({ gameEdit }: { gameEdit?: Game }) {
  const [step, setStep] = useState(1);
  const [game, setGame] = useState<Game | null>(gameEdit ?? null);
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-center">
        <BreadCrumb step={step} setStep={setStep} game={game} />
      </div>
      <div className={`${step !== 1 && "hidden"}`}>
        <FormInfos setStep={setStep} setGame={setGame} game={game} />
      </div>
      <div className={`${game && step !== 2 && "hidden"}`}>
        {game && <FormImage game={game} setStep={setStep} />}
      </div>
      <div className={`${game && step !== 3 && "hidden"}`}>
        {game && <FormInfosSec game={game} setStep={setStep} />}
      </div>
      <div className={`${game && step !== 4 && "hidden"}`}>
        {game && <FormCreators game={game} setStep={setStep} />}
      </div>
    </div>
  );
}
