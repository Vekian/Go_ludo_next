"use client";
import InputSearchCity from "@/components/ui/input/search/InputSearchCity";
import { GameLocalisation } from "@/interfaces";
import { TypeSelectionLocalisation } from "@/interfaces/localisation.interface";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function SelectCity({
  city,
  setCity,
}: {
  city: GameLocalisation | null;
  setCity: (
    newCity: GameLocalisation | null,
    localisation: TypeSelectionLocalisation
  ) => void;
}) {
  const handleCityChange = (city: GameLocalisation | null) => {
    setCity(city, { type: "city" });
  };
  return (
    <>
      <InputSearchCity
        label="Une ville (code postal, ville..)"
        icon={faCity}
        onChange={handleCityChange}
      />
      {city && <input type="hidden" name="city" value={city.id} />}
    </>
  );
}
