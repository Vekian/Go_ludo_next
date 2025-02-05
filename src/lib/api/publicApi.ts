import { Param } from "@/interfaces";

export async function getPublicGames(params: Param[] = []) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/public/game`);
  params
    .filter((param) => param.value)
    .forEach((param) => {
      if (typeof param.value === "string") {
        url.searchParams.append(param.key, param.value);
      }
    });
  return fetch(url).then((response) => response.json());
}

export async function getPublicGlobal(params: Param[] = []) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/public/global`
  );
  params
    .filter((param) => param.value)
    .forEach((param) => {
      if (typeof param.value === "string") {
        url.searchParams.append(param.key, param.value);
      }
    });
  return fetch(url).then((response) => response.json());
}

export async function getPublicCity(params: Param[] = []) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/public/commune`
  );
  params
    .filter((param) => param.value)
    .forEach((param) => {
      if (typeof param.value === "string") {
        url.searchParams.append(param.key, param.value);
      }
    });
  return fetch(url).then((response) => response.json());
}