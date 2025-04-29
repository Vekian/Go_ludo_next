"use server";
import { GameCreatorToAdd } from "@/interfaces";
import { handleAuth } from "../authServer";
import { z } from "zod";

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

export async function getCreators() {
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

export async function addGameCreator(creator: GameCreatorToAdd) {
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

  if (!response.ok) {
    return {
      ok: false,
      message:
        "Impossible d'associer le créateur au jeu, veuillez vérifier vos informations",
    };
  }
  const data = await response.json();
  return {
    ok: true,
    message: "Créateur associé au jeu avec succès",
    data: data,
  };
}

export async function deleteGameCreator(id: number) {
  const headers = await handleAuth();
  headers.set("Accept", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/game-creator/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: headers,
  });

  if (!response.ok) {
    return {
      ok: false,
      message: "Impossible de supprimer le créateur",
    };
  }

  return {
    ok: true,
    message: "Créateur enlevé avec succès",
  };
}
