"use server";
import { handleAuth } from "../authServer";

export async function getUser(id: string) {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${id}`
  );
  return fetch(url, { headers }).then((response) => response.json());
}
