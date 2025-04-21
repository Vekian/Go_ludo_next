"use client";
import FormImage from "./FormImage";
import FormInfos from "@/components/form/FormInfos";
import React, { useState } from "react";

export default function FormGame() {
  const [step, setStep] = useState(1);
  const [gameId, setGameId] = useState<number | null>(null);
  return (
    <div>
      {step === 1 && <FormInfos setStep={setStep} setGameId={setGameId} />}
      {gameId && step === 2 && <FormImage gameId={gameId} />}
    </div>
  );
}
