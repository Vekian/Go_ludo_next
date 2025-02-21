"use server";
import { handleAuth } from "../authServer";

export async function getReviews(gameId: number) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review/${gameId}`
  );
  const headers = await handleAuth();
  const response = await fetch(url, { headers });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
