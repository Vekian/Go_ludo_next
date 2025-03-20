"use client";
import InputSearchCity from "@/components/ui/input/search/InputSearchCity";
import { CityDetails } from "@/interfaces/localisation.interface";
import { getCity } from "@/lib/api/server/city";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

export default function SelectCity({
  setPosition,
}: {
  setPosition: (gepoint: [number, number] | null) => void;
}) {
  const [city, setCity] = useState<number | null>(null);

  useEffect(() => {
    fetchCityDetails();
  }, [city]);

  const fetchCityDetails = async () => {
    if (city) {
      const cityDetails: CityDetails = await getCity(city);
      const coordinates = cityDetails.geoPoint.coordinates;
      setPosition(coordinates);
    }
  };
  const handleCityChange = (idCity: number | null) => {
    setCity(idCity);
  };
  return (
    <div className="w-1/2">
      <InputSearchCity
        label="Une ville (code postal, ville..)"
        icon={faCity}
        onChange={handleCityChange}
      />
      {city && <input type="hidden" name="city" value={city} />}
    </div>
  );
}
