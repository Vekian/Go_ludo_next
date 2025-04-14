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
    <div className="bg-white rounded-lg px-6 lg:px-12 xl:px-24 2xl:px-36 py-6 w-full flex flex-col gap-y-6">
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col w-full lg:w-4/5 xl:w-2/5 2xl:w-1/2 gap-y-3">
          <h3>Choisis un lieu de rencontre </h3>
          <div className=" w-full ">
            <SelectCity city={city} setCity={handleCityChange} />
          </div>

          {errors?.city && <p className="text-red-500">{errors.city[0]}</p>}
        </div>
        <div className="flex flex-wrap justify-center xl:mt-0 mt-3 sm:justify-around items-end w-full xl:w-3/5 2xl:w-1/2 gap-y-2">
          {city && (
            <p className="font-bold sm:w-1/3 w-full text-center">
              Ville: {city?.name}
            </p>
          )}

          {position && (
            <>
              <p className="font-bold sm:w-1/3 w-full text-center">
                Lat: {position[0]}
              </p>
              <p className="font-bold sm:w-1/3 w-full text-center">
                Lon: {position[1]}
              </p>
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
