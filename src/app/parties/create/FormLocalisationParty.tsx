"use client";
import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import SelectCity from "./SelectCity";
import {
  CityDetails,
  TypeSelectionLocalisation,
} from "@/interfaces/localisation.interface";
import { getCity } from "@/lib/api/server/city";
import { GameLocalisation } from "@/interfaces";

const DynamicMap = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});

export default function FormLocalisationParty({
  errors,
}: {
  errors: Record<string, string[]> | null;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [city, setCity] = useState<GameLocalisation | null>(null);
  const [localisation, setLocalisation] = useState<TypeSelectionLocalisation>({
    type: "gps",
  });

  useEffect(() => {
    if (localisation.type === "city") {
      fetchCityDetails();
    }
  }, [city]);

  const fetchCityDetails = async () => {
    if (city) {
      const cityDetails: CityDetails = await getCity(city.id);
      const coordinates = cityDetails.geoPoint.coordinates;
      setPosition(coordinates);
    }
  };

  const handleCityChange = (
    city: GameLocalisation | null,
    localisation: TypeSelectionLocalisation
  ) => {
    setLocalisation(localisation);
    if (city) {
      setCity(city);
    }
  };

  return (
    <div className="bg-white rounded-lg px-36 py-6 w-full flex flex-col gap-y-6">
      <div className="flex w-full">
        <div className="flex flex-col w-1/2">
          <h3>Choisis un lieu de rencontre </h3>
          <SelectCity city={city} setCity={handleCityChange} />
          {errors?.city && <p className="text-red-500">{errors.city[0]}</p>}
        </div>
        <div className="flex justify-around items-end w-1/2">
          {city && <p className="font-bold">Ville: {city?.name}</p>}

          {position && (
            <>
              <p className="font-bold">Lat: {position[0]}</p>
              <p className="font-bold">Lon: {position[1]}</p>
            </>
          )}
        </div>
      </div>
      {position && <input type="hidden" name="longitude" value={position[0]} />}
      {position && <input type="hidden" name="latitude" value={position[1]} />}

      <DynamicMap
        position={position}
        setCity={handleCityChange}
        setPosition={setPosition}
      />
    </div>
  );
}
