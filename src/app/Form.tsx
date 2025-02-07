"use client";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import InputSearchCity from "@/components/ui/input/search/InputSearchCity";
import InputSearchGlobal from "@/components/ui/input/search/InputSearchGlobal";
import { faDice, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Form() {
  const [city, setCity] = useState<number | null>(null);
  const [global, setGlobal] = useState<number | null>(null);
  const [globalType, setGlobalType] = useState<string | null>(null);
  const router = useRouter();

  function handleSubmit() {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/parties`);
    if (city) {
      url.searchParams.append("city", city.toString());
    }
    if (global && globalType) {
      const type = globalType === "base" ? "game" : globalType;
      url.searchParams.append(type, global.toString());
    }
    router.push(url.toString());
  }

  function handleGlobal(value: number | null, type: string | null) {
    setGlobal(value);
    setGlobalType(type);
  }
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
          onChange={setCity}
        />
      </div>
      <div className="w-full flex flex-col">
        <label className="mb-2">Une envie de jeu particulière ?</label>
        <InputSearchGlobal
          label="Un jeu, un thème..."
          icon={faDice}
          onChange={handleGlobal}
        />
      </div>
      <div className="mt-3">
        <ButtonPrimary
          label="Chercher"
          color="primary-600"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
