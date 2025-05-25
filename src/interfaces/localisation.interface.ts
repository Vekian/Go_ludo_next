export interface CityDetails {
  id: number;
  name: string;
  geoPoint: GeoPoint;
  regName: string;
  depName: string;
  comCode: string;
  regCode: string;
  depCode: string;
  codePostal: string;
}

export interface CityListItem {
  id: number;
  name: string;
  codePostal: string;
}

export interface GeoPoint {
  type: string;
  coordinates: [number, number];
  srid: number;
}

export interface TypeSelectionLocalisation {
  type: "city" | "gps";
}
