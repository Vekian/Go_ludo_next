import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ButtonPrimary from "../ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import { Game } from "@/interfaces";

function ElmBreadCrumb({
  name,
  icon,
  step,
  actualStep,
  setStep,
}: {
  name: string;
  icon: boolean;
  step: number;
  actualStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex gap-x-2 items-center">
      {icon && <FontAwesomeIcon icon={faChevronRight} />}
      <ButtonPrimary
        label={name}
        color={
          step === actualStep
            ? theme.colors.primary[500]
            : theme.colors.primary[900]
        }
        onClick={() => setStep(step)}
      />
    </div>
  );
}

export default function BreadCrumb({
  step,
  setStep,
  game,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  game: Game | null;
}) {
  return (
    <div className="flex gap-x-3">
      {(step > 0 || game) && (
        <ElmBreadCrumb
          name="Infos principales"
          icon={false}
          step={1}
          actualStep={step}
          setStep={setStep}
        />
      )}
      {(step > 1 || game) && (
        <ElmBreadCrumb
          name="Images du jeu"
          icon={true}
          step={2}
          actualStep={step}
          setStep={setStep}
        />
      )}
      {(step > 2 || game) && (
        <ElmBreadCrumb
          name="Infos secondaires"
          icon={true}
          step={3}
          actualStep={step}
          setStep={setStep}
        />
      )}
      {(step > 3 || game) && (
        <ElmBreadCrumb
          name="Créateurs"
          icon={true}
          step={4}
          actualStep={step}
          setStep={setStep}
        />
      )}
    </div>
  );
}
