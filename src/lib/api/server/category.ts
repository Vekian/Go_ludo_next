"use server";
import { handleAuth } from "../authServer";

export async function getCategories(type: string) {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}`
  );
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Impossible de charger les catégories");
  }
  const data = await response.json();
  return data;
}
