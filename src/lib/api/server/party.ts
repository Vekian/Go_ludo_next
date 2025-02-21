"use server";

import { Message } from "@/interfaces/party.interface";
import { handleAuth } from "../authServer";

export async function getParty(id: number) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party/${id}`
  );
  const headers = await handleAuth();
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Impossible de charger la partie");
  }
  const data = await response.json();
  return data;
}
export async function sendMessage(data: unknown) {
  const response = await fetch("/api/party/message", {
    body: JSON.stringify(data),
    method: "POST",
  });
  if (response.ok) {
    const message: Message = await response.json();
    return message;
  }
}
