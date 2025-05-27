"use server";

import { GameListItem, Param } from "@/interfaces";
import { handleAuth } from "../authServer";
import { handleResponse, ResponserServer } from "../fetch";
import { ListPaginated } from "@/interfaces/paginator.interface";
import { CityListItem } from "@/interfaces/localisation.interface";

export async function searchGames(
  params: Param[] = []
): Promise<ResponserServer<ListPaginated<GameListItem>>> {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/search`
  );
  params
    .filter((param) => param.value)
    .forEach((param) => {
      if (typeof param.value === "string") {
        url.searchParams.append(param.key, param.value);
      }
    });
  console.error(url);
  const response = await fetch(url, { headers });

  return handleResponse(response);
}

export async function searchCities(
  params: Param[] = []
): Promise<ResponserServer<CityListItem[]>> {
  const headers = await handleAuth();
  const url = new URL(`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/commune`);
  params
    .filter((param) => param.value)
    .forEach((param) => {
      if (typeof param.value === "string") {
        url.searchParams.append(param.key, param.value);
      }
    });
  const response = await fetch(url, { headers });

  return handleResponse(response);
}

export async function searchGlobal(
  params: Param[] = []
): Promise<ResponserServer<GameListItem[]>> {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/global/category`
  );
  params
    .filter((param) => param.value)
    .forEach((param) => {
      if (typeof param.value === "string") {
        url.searchParams.append(param.key, param.value);
      }
    });
  const response = await fetch(url, { headers });
  return handleResponse(response);
}
