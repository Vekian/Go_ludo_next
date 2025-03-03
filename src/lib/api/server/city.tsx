"use server";
import { handleAuth } from "../authServer";

export async function getCity(cityId: number) {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/commune/${cityId}`
  );
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Impossible de charger la ville");
  }
  const data = await response.json();
  return data;
}
