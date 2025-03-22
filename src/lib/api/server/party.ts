"use server";

import { handleAuth } from "../authServer";
import { z } from "zod";

const searchPartySchema = z.object({
  age: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
  city: z.coerce.number().optional(),
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

const createPartySchema = z.object({
  ageMin: z.coerce.number(),
  ageMax: z.coerce.number(),
  city: z.coerce.number().min(1, "Veuillez choisir une ville").default(0),
  playersMin: z.coerce.number(),
  playersMax: z.coerce.number(),
  games: z
    .array(z.number().min(1, "Veuillez choisir au moins un jeu"))
    .default([0]),
  meetingDate: z.union([z.coerce.date(), z.null()]).optional(),
  meetingTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format invalide (HH:MM)")
    .optional()
    .nullable(),
  title: z
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

export async function searchParties(formData: FormData) {
  const validatedFields = searchPartySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Impossible de modifier l'avis",
      ok: false,
    };
  }
  const url = new URL(`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party`);

  const validatedData = Object.entries(validatedFields.data);
  validatedData.forEach((param) => {
    url.searchParams.append(param[0], String(param[1]));
  });
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "GET",
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

export async function leaveParty(idParty: number, idParticipant: number) {
  const body = {
    participant: idParticipant,
  };
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party/leave/${idParty}`
  );
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers,
    method: "PUT",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return {
      ok: false,
      message: "Impossible de quitter la partie",
    };
  }
  return {
    ok: true,
    message: "Vous avez quitté la partie avec succès",
  };
}

export async function createParty(
  formData: FormData,
  gamesId: number[] | undefined
) {
  const rawData = Object.fromEntries(formData.entries());
  const filteredData = Object.fromEntries(
    Object.entries(rawData).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined
    )
  );

  const validatedFields = createPartySchema.safeParse({
    games: gamesId,
    ...filteredData,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Impossible de créer la partie",
      ok: false,
    };
  }

  const url = new URL(`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party`);
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
        "Impossible de créeer la partie, veuillez vérifier vos informations",
    };
  }
  const data = await response.json();
  return {
    ok: true,
    message: "Partie créée avec succès",
    data: data,
  };
}
