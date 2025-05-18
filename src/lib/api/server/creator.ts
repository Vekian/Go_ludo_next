"use server";
import { Creator, GameCreatorToAdd } from "@/interfaces";
import { handleAuth } from "../authServer";
import { z } from "zod";
import { handleResponse, ResponserServer } from "../fetch";

const createGameCreatorSchema = z.object({
  game: z.coerce.number().min(1, "Jeu invalide"),
  creator: z.coerce.number().min(1, "Créateur invalide"),
  jobs: z.array(
    z
      .string()
      .min(1, "Le job du créateur n'est pas valide")
      .max(200, "Le job du créateur n'est pas valide")
  ),
});

export async function getCreators(): Promise<ResponserServer<Creator[]>> {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/creator`
  );
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Impossible de charger les catégories");
  }
  const data = await response.json();
  return data;
}

export async function addGameCreator(
  creator: GameCreatorToAdd
): Promise<ResponserServer> {
  const validatedFields = createGameCreatorSchema.safeParse(creator);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: `Impossible d'associer le créateur au jeu`,
      ok: false,
    };
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/game-creator`
  );
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(validatedFields.data),
  });

  return handleResponse(
    response,
    "Créateur associé au jeu avec succès",
    "Impossible d'associer le créateur au jeu, veuillez vérifier vos informations"
  );
}

export async function deleteGameCreator(id: number): Promise<ResponserServer> {
  const headers = await handleAuth();
  headers.set("Accept", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/game-creator/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: headers,
  });

  return handleResponse(
    response,
    "Créateur enlevé avec succès",
    "Impossible de supprimer le créateur"
  );
}
