"use server";
import { Param } from "@/interfaces";
import { handleAuth } from "../authServer";
import { z } from "zod";
import { validateImageGame } from "../validation/image";

const createGameSchema = z.object({
  ageMin: z.coerce.number(),
  ageMax: z.coerce.number(),
  playersMin: z.coerce.number(),
  playersMax: z.coerce.number(),
  playtimeMin: z.coerce.number(),
  playtimeMax: z.coerce.number(),
  language: z.string(),
  categories: z
    .array(z.coerce.number().min(1, "Catégorie invalide"))
    .default([0]),
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

const updateGameSchema = z.object({
  weight: z.coerce.number().nullable().optional(),
  length: z.coerce.number().nullable().optional(),
  height: z.coerce.number().nullable().optional(),
  width: z.coerce.number().nullable().optional(),
  content: z.array(z.string()),
  publishedAt: z.union([z.coerce.date(), z.null()]).optional(),
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

export async function addGame(formData: FormData, type: string) {
  const rawData = Object.fromEntries(formData.entries());
  const categories = formData.getAll("categories[]");

  delete rawData["categories[]"];

  const fixedData = {
    ...rawData,
    categories,
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
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}`
  );
  const response = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(validatedFields.data),
  });
  const data = await response.json();
  if (!response.ok) {
    return {
      ok: false,
      message: "Impossible de créer la fiche de jeu",
      errors: {
        general: data.message,
      },
    };
  }

  return {
    ok: true,
    message: "Fiche de jeu créée avec succès",
    data: data,
  };
}

export async function updateGame(
  formData: FormData,
  type: string,
  gameId: number
) {
  const rawData = Object.fromEntries(formData.entries());
  const categories = formData.getAll("categories[]");

  delete rawData["categories[]"];

  const fixedData = {
    ...rawData,
    categories,
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
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}/${gameId}`
  );
  const response = await fetch(url, {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    const data = await response.json();
    return {
      ok: false,
      message: "Impossible de modifier la fiche de jeu",
      errors: {
        general: data.message,
      },
    };
  }

  return {
    ok: true,
    message: "Fiche de jeu modifiée avec succès",
    data: {
      id: gameId,
    },
  };
}

export async function updateGameInfosSec(
  formData: FormData,
  type: string,
  gameId: number
) {
  const rawData = Object.fromEntries(formData.entries());
  const cleanedRawData = Object.fromEntries(
    Object.entries(rawData).filter(([, value]) => {
      return typeof value === "string" && value.trim() !== "";
    })
  );
  const content = formData.getAll("content[]");

  delete cleanedRawData["content[]"];

  const fixedData = {
    ...cleanedRawData,
    content,
  };

  const validatedFields = updateGameSchema.safeParse(fixedData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Impossible d'ajouter les infos secondaires",
      ok: false,
    };
  }

  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}/${gameId}`
  );
  const response = await fetch(url, {
    headers: headers,
    method: "PATCH",
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    const data = await response.json();
    return {
      ok: false,
      message: "Impossible d'ajouter les infos secondaires",
      errors: {
        general: data.message,
      },
    };
  }

  return {
    ok: true,
    message: "Infos secondaires ajoutées avec succès",
    data: {
      id: gameId,
    },
  };
}

export async function uploadImageGame(formData: FormData, gameId: number) {
  const file = formData.get("file") as File | null;

  if (!file) {
    return {
      ok: false,
      message: "Aucun fichier reçu.",
      errors: {
        file: ["Veuillez sélectionner une image"],
      },
    };
  }
  const validationResult = validateImageGame(file);
  if (!validationResult.success) {
    return {
      ok: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  const headers = await handleAuth();
  headers.set("Accept", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/image/${gameId}`;

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    return {
      ok: false,
      message: data.message,
    };
  }

  return {
    ok: true,
    message: "Image upload avec succès",
  };
}

export async function deleteImageGame(id: number) {
  const headers = await handleAuth();
  headers.set("Accept", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/image/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: headers,
  });

  if (!response.ok) {
    return {
      ok: false,
      message: "Impossible de supprimer l'image",
    };
  }

  return {
    ok: true,
    message: "Image effacée avec succès",
  };
}

export async function coverImageGame(id: number) {
  const headers = await handleAuth();
  headers.set("Accept", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/image/${id}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: headers,
  });

  if (!response.ok) {
    const data = await response.json();
    return {
      ok: false,
      message: data.message,
    };
  }

  return {
    ok: true,
    message: "Image mise en couverture",
  };
}
