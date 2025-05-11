"use server";

import { Param } from "@/interfaces";
import { handleAuth } from "./authServer";

export async function searchGames(params: Param[] = []) {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/search`
  );
  params
    .filter((param) => param.value)
    .forEach((param) => {
      if (typeof param.value === "string") {
        console.log(param.key, param.value);
        url.searchParams.append(param.key, param.value);
      }
    });
  return fetch(url, { headers }).then((response) => response.json());
}

export async function searchCities(params: Param[] = []) {
  const headers = await handleAuth();
  const url = new URL(`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/commune`);
  params
    .filter((param) => param.value)
    .forEach((param) => {
      if (typeof param.value === "string") {
        url.searchParams.append(param.key, param.value);
      }
    });
  return fetch(url, { headers }).then((response) => response.json());
}

export async function searchGlobal(params: Param[] = []) {
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
  return fetch(url, { headers }).then((response) => response.json());
}
