"use client"; // Nécessaire pour Next.js 13+ (App Router)

import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapContent from "./MapContent";

const Map = ({ position }: { position: [number, number] | null }) => {
  return (
    <MapContainer
      center={[48.8566, 2.3522]} // Centre la carte sur 'marker' ou la valeur par défaut
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <MapContent position={position} />
    </MapContainer>
  );
};

export default Map;
