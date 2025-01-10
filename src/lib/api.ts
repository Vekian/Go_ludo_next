import { Param } from "@/interfaces";

export function getGames(params: Param[] = []) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/base`
  );
  params
    .filter((param) => param.value)
    .forEach((param) => {
      if (typeof param.value === "string") {
        url.searchParams.append(param.key, param.value);
      } else {
        param.value.forEach((value) =>
          url.searchParams.append(param.key, value)
        );
      }
    });
  return fetch(url).then((response) => response.json());
}

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

export function getGame(id: number, type: string) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}/${id}`
  );
  return fetch(url).then((response) => response.json());
}

export function getCategories(type: string) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}`
  );
  return fetch(url).then((response) => response.json());
}
