import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import InputSearchCity from "@/components/ui/input/search/InputSearchCity";
import InputSearchGlobal from "@/components/ui/input/search/InputSearchGlobal";
import { faDice, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function Form() {
  return (
    <div className="w-1/3 flex pl-16 pr-16 flex-col items-center justify-center">
      <h1 className="text-primary-950 text-center mb-2">
        Près de chez vous, des joueurs vous attendent !
      </h1>
      <div className="w-full flex flex-col mb-3">
        <label className="mb-2">Chercher une partie</label>
        <InputSearchCity
          label="Où ? (ville, code postal...)"
          icon={faLocationDot}
        />
      </div>
      <div className="w-full flex flex-col">
        <label className="mb-2">Une envie de jeu particulière ?</label>
        <InputSearchGlobal label="Un jeu, un thème..." icon={faDice} />
      </div>
      <ButtonPrimary label="Chercher" color="primary-600" />
    </div>
  );
}
