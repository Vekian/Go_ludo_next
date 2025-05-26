"use server";

import { handleAuth } from "../authServer";
import { createPartySchema, searchPartySchema } from "../validation/party";
import { handleResponse, handleValidation, ResponserServer } from "../fetch";
import { ListPaginated } from "@/interfaces/paginator.interface";
import { PartyCard } from "@/interfaces/party.interface";

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

export async function findPartiesByStatus(
  status: string,
  page?: string
): Promise<ResponserServer<ListPaginated<PartyCard>>> {
  const url = new URL(
    `${
      process.env.NEXT_PUBLIC_API_SYMFONY_URL
    }/api/party?status=${status}&page=${page ?? 1}`
  );
  const headers = await handleAuth();
  const response = await fetch(url, { headers });

  return handleResponse(
    response,
    "Partie recherchée avec succès",
    "Impossible de rechercher les parties, veuillez vérifier vos informations"
  );
}

export async function searchParties(
  parameters: Record<string, string | undefined>
): Promise<ResponserServer<ListPaginated<PartyCard>>> {
  const validatedData = handleValidation(
    parameters,
    searchPartySchema,
    "Impossible de modifier l'avis"
  );
  if (!validatedData.ok) {
    return validatedData as ResponserServer<ListPaginated<PartyCard>>;
  }
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party/recommendations`
  );

  if (validatedData.data) {
    Object.entries(validatedData.data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "GET",
  });

  return handleResponse(
    response,
    "Partie recherchée avec succès",
    "Impossible de rechercher les parties, veuillez vérifier vos informations"
  );
}

export async function leaveParty(
  idParty: number,
  idParticipant: number
): Promise<ResponserServer> {
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

  return handleResponse(
    response,
    "Vous avez quitté la partie",
    "Impossible de quitter la partie"
  );
}

export async function joinParty(idParty: number): Promise<ResponserServer> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party/join/${idParty}`
  );
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers,
    method: "PUT",
  });

  return handleResponse(
    response,
    "Vous avez rejoint la partie",
    "Impossible de rejoindre la partie"
  );
}

export async function createParty(
  formData: FormData,
  gamesId: number[] | undefined
): Promise<ResponserServer<PartyCard>> {
  const rawData = Object.fromEntries(formData.entries());
  const filteredData = Object.fromEntries(
    Object.entries(rawData).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined
    )
  );

  const validatedData = handleValidation(
    {
      games: gamesId,
      ...filteredData,
    },
    createPartySchema,
    "Impossible de créer la partie"
  );

  if (!validatedData.ok) {
    return validatedData as ResponserServer<PartyCard>;
  }

  const url = new URL(`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party`);
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(validatedData.data),
  });

  return handleResponse(
    response,
    "Partie créée avec succès",
    "Impossible de créeer la partie, veuillez vérifier vos informations"
  );
}
