"use server";
import { GameCategory } from "@/interfaces";
import { handleAuth } from "../authServer";
import { handleResponse, ResponserServer } from "../fetch";

export async function getCategories(
  type: string
): Promise<ResponserServer<GameCategory[]>> {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}`
  );
  const response = await fetch(url, { headers });

  return handleResponse(response);
}
