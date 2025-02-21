"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, User } from "next-auth";
import { handleAuth } from "../authServer";

interface GameCollection {
  game: number;
  owner: number;
}
export async function addGameToCollection(gameId: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Non authorisé");
  }
  const user = session.user as User;
  const body: GameCollection = {
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

  if (!response.ok) {
    return {
      message: "Erreur lors de l'ajout du jeu dans la collection",
      ok: false,
    };
  }

  return { message: "Jeu ajouté à votre collection", ok: true };
}

export async function deleteGameFromCollection(gameId: number) {
  const headers = await handleAuth();
  headers.set("Content-Type", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/game/${gameId}`;

  const response = await fetch(url, {
    headers: headers,
    method: "DELETE",
  });

  if (!response.ok) {
    return {
      message: "Erreur lors du retrait du jeu dans la collection",
      ok: false,
    };
  }

  return { message: "Jeu retiré de votre collection", ok: true };
}
