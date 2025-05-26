"use server";
import { CityListItem } from "@/interfaces/localisation.interface";
import { handleAuth } from "../authServer";
import { handleResponse, ResponserServer } from "../fetch";
import { CityDetails } from "@/interfaces/localisation.interface";

export async function getCity(
  cityId: number | null
): Promise<ResponserServer<CityDetails>> {
  if (!cityId) {
    return {
      ok: false,
      message: "Ville invalide",
    };
  }
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/commune/${cityId}`
  );
  const response = await fetch(url, { headers });

  return handleResponse(response);
}

export async function getCityItem(
  cityId: number | null
): Promise<ResponserServer<CityListItem>> {
  if (!cityId) {
    return {
      ok: false,
      message: "Ville invalide",
    };
  }
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/commune/${cityId}`
  );
  const response = await fetch(url, { headers });

  return handleResponse(response);
}

export async function getCityByGps(
  position: [number, number]
): Promise<ResponserServer<CityListItem>> {
  const headers = await handleAuth();

  const body = {
    latitude: position[0],
    longitude: position[1],
  };

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/commune/find/gps`
  );
  const response = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(body),
  });

  return handleResponse(response);
}
