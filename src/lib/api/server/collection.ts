"use server";

import { authOptions } from "../nextAuth";
import { getServerSession, User } from "next-auth";
import { handleAuth } from "../authServer";
import { handleResponse, ResponserServer } from "../fetch";

export async function addGameToCollection(
  gameId: number
): Promise<ResponserServer> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Non authorisé");
  }
  const user = session.user as User;
  const body = {
    game: gameId,
    owner: Number(user.id),
  };
  const headers = await handleAuth();
  headers.set("Content-Type", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/game`;

  const response = await fetch(url, {
    headers: headers,
    body: JSON.stringify(body),
    method: "POST",
  });

  return handleResponse(
    response,
    "Jeu ajouté à votre collection",
    "Erreur lors de l'ajout du jeu dans la collection"
  );
}

export async function deleteGameFromCollection(
  gameId: number
): Promise<ResponserServer> {
  const headers = await handleAuth();
  headers.set("Content-Type", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/game/${gameId}`;

  const response = await fetch(url, {
    headers: headers,
    method: "DELETE",
  });

  return handleResponse(
    response,
    "Jeu retiré de votre collection",
    "Erreur lors du retrait du jeu dans la collection"
  );
}
