"use server";
import { Param } from "@/interfaces";
import { handleAuth } from "../authServer";

export async function getGames(params: Param[] = []) {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/base`
  );
  params
    .filter((param) => param.value)
    .forEach((param) => {
      if (typeof param.value === "string") {
        url.searchParams.append(param.key, param.value);
      } else {
        param.value.forEach((value) =>
          url.searchParams.append(param.key, value)
        );
      }
    });

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Impossible de charger les jeux");
  }
  const data = await response.json();
  return data;
}

export async function getGame(id: number, type: string) {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}/${id}`
  );
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Impossible de charger le jeu");
  }
  const data = await response.json();
  return data;
}
