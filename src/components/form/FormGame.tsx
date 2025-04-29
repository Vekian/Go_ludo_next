import FormImage from "./FormImage";
import FormInfos from "@/components/form/FormInfos";
import React from "react";
import FormInfosSec from "./FormInfosSec";
import BreadCrumb from "./BreadCrumb";
import { Game } from "@/interfaces";
import FormCreators from "./FormCreators";

export default function FormGame({
  game,
  step = 1,
}: {
  game?: Game | null;
  step?: number;
}) {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-center">
        {game && step && <BreadCrumb step={step} game={game} />}
      </div>
      {step === 1 && (
        <div>
          <FormInfos game={game ?? null} />
        </div>
      )}
      {step === 2 && game && (
        <div>
          <FormImage game={game} />
        </div>
      )}
      {step === 3 && game && (
        <div>
          <FormInfosSec game={game} />
        </div>
      )}
      {step === 4 && game && (
        <div>
          <FormCreators game={game} />
        </div>
      )}
    </div>
  );
}
