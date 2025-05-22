"use server";
import { Game, GameDetails, GameListItem, Param } from "@/interfaces";
import { handleAuth } from "../authServer";
import { handleResponse, handleValidation, ResponserServer } from "../fetch";
import { createGameSchema, updateGameSchema } from "../validation/game";
import { ListPaginated } from "@/interfaces/paginator.interface";

export async function getGames(
  params: Param[] = []
): Promise<ResponserServer<ListPaginated<GameListItem>>> {
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

  return handleResponse(response);
}

export async function getGamesRec(): Promise<ResponserServer<GameListItem[]>> {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/recommendations`
  );

  const response = await fetch(url, { headers });
  return handleResponse(response);
}

export async function getGame(
  id: number | null,
  type: string | null
): Promise<ResponserServer<GameDetails>> {
  if (!id) {
    return {
      ok: false,
      message: "Jeu invalide",
    };
  }
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}/${id}`
  );
  const response = await fetch(url, { headers });

  return handleResponse(response);
}

export async function getGameItem(
  id: number | null
): Promise<ResponserServer<GameListItem>> {
  if (!id) {
    return {
      ok: false,
      message: "Jeu invalide",
    };
  }
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/item/${id}`
  );
  const response = await fetch(url, { headers });

  return handleResponse(response);
}

export async function addGame(
  formData: FormData,
  type: string
): Promise<ResponserServer<Game>> {
  const rawData = Object.fromEntries(formData.entries());
  const categories = formData.getAll("categories[]");

  delete rawData["categories[]"];

  const fixedData = {
    ...rawData,
    categories,
  };

  const validatedData = handleValidation(
    fixedData,
    createGameSchema,
    "Impossible de créer la fiche de jeu"
  );
  if (!validatedData.ok) {
    return validatedData as ResponserServer<Game>;
  }

  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}`
  );
  const response = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(validatedData.data),
  });

  return handleResponse(response);
}

export async function updateGame(
  formData: FormData,
  type: string,
  gameId: number
): Promise<ResponserServer<Game>> {
  const rawData = Object.fromEntries(formData.entries());
  const categories = formData.getAll("categories[]");

  delete rawData["categories[]"];

  const fixedData = {
    ...rawData,
    categories,
  };

  const validatedData = handleValidation(
    fixedData,
    createGameSchema,
    "Impossible de modifier la fiche de jeu"
  );
  if (!validatedData.ok) {
    return validatedData as ResponserServer<Game>;
  }

  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}/${gameId}`
  );
  const response = await fetch(url, {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(validatedData.data),
  });

  return handleResponse(
    response,
    "Fiche de jeu modifiée avec succès",
    "Impossible de modifier la fiche de jeu"
  );
}

export async function updateGameInfosSec(
  formData: FormData,
  type: string,
  gameId: number
): Promise<ResponserServer<Game>> {
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

  const validatedData = handleValidation(
    fixedData,
    updateGameSchema,
    "Impossible de modifier la fiche de jeu"
  );
  if (!validatedData.ok) {
    return validatedData as ResponserServer<Game>;
  }

  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}/${gameId}`
  );
  const response = await fetch(url, {
    headers: headers,
    method: "PATCH",
    body: JSON.stringify(validatedData.data),
  });

  return handleResponse(
    response,
    "Infos secondaires ajoutées avec succès",
    "Impossible d'ajouter les infos secondaires"
  );
}

export async function uploadImageGame(
  formData: FormData,
  gameId: number
): Promise<ResponserServer> {
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
  const validatedData = handleValidation(
    { file: file },
    updateGameSchema,
    "Erreur lors de la validation de l'image"
  );
  if (!validatedData.ok) {
    return validatedData as ResponserServer;
  }
  const headers = await handleAuth();
  headers.set("Accept", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/image/${gameId}`;

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: formData,
  });

  return handleResponse(response, "Image upload avec succès");
}

export async function deleteImageGame(id: number): Promise<ResponserServer> {
  const headers = await handleAuth();
  headers.set("Accept", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/image/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: headers,
  });

  return handleResponse(
    response,
    "Image effacée avec succès",
    "Impossible de supprimer l'image"
  );
}

export async function coverImageGame(id: number): Promise<ResponserServer> {
  const headers = await handleAuth();
  headers.set("Accept", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/image/${id}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: headers,
  });

  return handleResponse(
    response,
    "Image mise en couverture",
    "Impossible de mettre l'image en couverture"
  );
}
