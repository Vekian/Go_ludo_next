"use server";
import { Param } from "@/interfaces";
import { handleAuth } from "../authServer";
import { z } from "zod";

const createGameSchema = z.object({
  ageMin: z.coerce.number(),
  ageMax: z.coerce.number(),
  playersMin: z.coerce.number(),
  playersMax: z.coerce.number(),
  playtimeMin: z.coerce.number(),
  playtimeMax: z.coerce.number(),
  category: z
    .array(z.coerce.number().min(1, "Catégorie invalide"))
    .default([0]),
  theme: z.array(z.coerce.number().min(1, "Catégorie invalide")).default([0]),
  mode: z.array(z.coerce.number().min(1, "Catégorie invalide")).default([0]),
  name: z
    .string()
    .min(4, "4 caractères minimum")
    .max(300, "300 caractères maximum")
    .default(""),

  description: z
    .string()
    .min(4, "4 caractères minimum")
    .max(500, "500 caractères maximum")
    .default(""),
});

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

export async function getGamesRec() {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/recommendations`
  );

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

export async function addGame(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const category = formData.getAll("category[]");
  const mode = formData.getAll("mode[]");
  const theme = formData.getAll("theme[]");

  delete rawData["category[]"];
  delete rawData["mode[]"];
  delete rawData["theme[]"];

  const fixedData = {
    ...rawData,
    category,
    mode,
    theme,
  };

  const validatedFields = createGameSchema.safeParse(fixedData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Impossible de créer la fiche de jeu",
      ok: false,
    };
  }

  const headers = await handleAuth();
  const url = new URL(`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game`);
  const response = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    throw new Error("Impossible de charger le jeu");
  }
  const data = await response.json();
  return data;
}
