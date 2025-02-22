"use server";

import { Message } from "@/interfaces/party.interface";
import { handleAuth } from "../authServer";
import { z } from "zod";

const formSchema = z.object({
  age: z.coerce.number().optional(),
  city: z
    .string({ required_error: "Veuillez choisir une ville" })
    .transform((value) => parseFloat(value))
    .refine(
      (value) => !isNaN(value) && value > 0,
      "Veuillez choisir une ville"
    ),
  zone: z.coerce.number().optional(),
  playersMin: z.coerce.number().optional(),
  playersMax: z.coerce.number().optional(),
  date: z.string().date().optional(),
  startTime: z.string().time().optional(),
  endTime: z.string().time().optional(),
  game: z.coerce.number().optional(),
  category: z.coerce.number().optional(),
  theme: z.coerce.number().optional(),
  mode: z.coerce.number().optional(),
  duration: z.coerce.number().optional(),
  rating: z.coerce.number().optional(),
});

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

export async function searchParties(formData: FormData) {
  const validatedFields = formSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Impossible de modifier l'avis",
      ok: false,
    };
  }
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party/search`
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
        "Impossible d'ajouter l'avis, veuillez vérifier vos informations",
    };
  }
  const data = await response.json();
  return {
    ok: true,
    message: "Avis ajouté avec succès",
    data: data,
  };
}
