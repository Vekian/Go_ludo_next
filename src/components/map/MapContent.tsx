import React, { useEffect, useState } from "react";
import { TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getCityByGps } from "@/lib/api/server/city";
import { CityListItem } from "@/interfaces/localisation.interface";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41], // Taille de l'icône
  iconAnchor: [12, 41], // Ancrage de l'icône
  popupAnchor: [1, -34], // Position du popup par rapport à l'icône
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png", // Ombre de l'icône
  shadowSize: [41, 41], // Taille de l'ombre
  shadowAnchor: [12, 41], // Ancrage de l'ombre
});

export default function MapContent({
  position,
  setCity,
  setPosition,
}: {
  position: [number, number] | null;
  setCity: (newCity: CityListItem | null) => void;
  setPosition: (geopoint: [number, number] | null) => void;
}) {
  const [marker, setMarker] = useState<[number, number]>([48.8566, 2.3522]); // Initialiser avec la prop position
  const map = useMap(); // S'assurer que ce hook est appelé dans un composant descendant de MapContainer
  const ClickHandler = ({
    onMapClick,
  }: {
    onMapClick: (latlng: L.LatLng) => void;
  }) => {
    useMapEvents({
      click: (e) => {
        onMapClick(e.latlng); // Passer latlng du clic au parent
      },
    });
    return null;
  };
  const addMarker = (latlng: L.LatLng) => {
    setMarker([latlng.lat, latlng.lng]); // Mettre à jour le marqueur
    fetchCity([latlng.lat, latlng.lng]);
    setPosition([latlng.lng, latlng.lat]);
  };
  useEffect(() => {
    if (position && position[0] != marker[1] && position[1] != marker[0]) {
      map.setView([position[1], position[0]], 13);
      setMarker([position[1], position[0]]);
    }
  }, [position]);

  const fetchCity = async (position: [number, number]) => {
    const response = await getCityByGps(position);
    if (response?.data?.id) {
      setCity(response.data);
    }
  };

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Gérer les clics sur la carte */}
      <ClickHandler onMapClick={addMarker} />

      {/* Afficher le dernier marqueur avec l'icône personnalisée */}
      {marker && (
        <Marker position={marker} icon={customIcon}>
          <Popup>
            📍 Marqueur ajouté à {marker[0].toFixed(5)}, {marker[1].toFixed(5)}
          </Popup>
        </Marker>
      )}
    </>
  );
}
