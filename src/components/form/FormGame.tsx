"use client";
import FormImage from "./FormImage";
import FormInfos from "@/components/form/FormInfos";
import React, { useEffect, useState } from "react";
import FormInfosSec from "./FormInfosSec";
import BreadCrumb from "./BreadCrumb";
import { Game } from "@/interfaces";
import FormCreators from "./FormCreators";
import { useRouter } from "next/navigation";
import CustomLinearProgress from "../ui/loader/CustomLoader";

export default function FormGame({
  game,
  initialStep = 1,
}: {
  game?: Game | null;
  initialStep?: string | number;
}) {
  const [step, setStep] = useState(Number(initialStep));
  const router = useRouter();

  useEffect(() => {
    if (step === 5 && game) {
      router.push(`/${game.type === "base" ? "game" : game.type}s/${game.id}`);
    }
  }, [step, game, router]);
  console.log(step);
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-center">
        <BreadCrumb step={step} setStep={setStep} game={game ?? null} />
      </div>
      <div className={`${step !== 1 && "hidden"}`}>
        <FormInfos setStep={setStep} game={game ?? null} />
      </div>
      <div className={`${step !== 5 && "hidden"}`}>
        <CustomLinearProgress />
      </div>
      {game && (
        <>
          <div className={`${step !== 2 && "hidden"}`}>
            {<FormImage game={game} setStep={setStep} />}
          </div>
          <div className={`${step !== 3 && "hidden"}`}>
            {<FormInfosSec game={game} setStep={setStep} />}
          </div>
          <div className={`${step !== 4 && "hidden"}`}>
            {<FormCreators game={game} setStep={setStep} />}
          </div>
        </>
      )}
    </div>
  );
}
