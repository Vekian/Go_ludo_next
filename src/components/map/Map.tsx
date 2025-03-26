"use client"; // Nécessaire pour Next.js 13+ (App Router)

import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapContent from "./MapContent";
import { TypeSelectionLocalisation } from "@/interfaces/localisation.interface";
import { GameLocalisation } from "@/interfaces";

const Map = ({
  position,
  setCity,
  setPosition,
}: {
  position: [number, number] | null;
  setCity: (
    idCity: GameLocalisation | null,
    localisation: TypeSelectionLocalisation
  ) => void;
  setPosition: (geopoint: [number, number] | null) => void;
}) => {
  const handleCityChange = (newCity: GameLocalisation | null) => {
    setCity(newCity, { type: "gps" });
  };
  return (
    <MapContainer
      center={[48.8566, 2.3522]} // Centre la carte sur 'marker' ou la valeur par défaut
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <MapContent
        position={position}
        setCity={handleCityChange}
        setPosition={setPosition}
      />
    </MapContainer>
  );
};

export default Map;
