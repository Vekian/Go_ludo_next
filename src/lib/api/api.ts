import { Param } from "@/interfaces";

const headers = process.env.KEY_SYMFONY_API
  ? new Headers({
      "X-AUTH-TOKEN": process.env.KEY_SYMFONY_API,
    })
  : undefined;
export function getGames(params: Param[] = []) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/private/game/base`
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

  return fetch(url, { headers }).then((response) => response.json());
}

export function getGame(id: number, type: string) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/private/game/${type}/${id}`
  );
  return fetch(url, { headers }).then((response) => response.json());
}

export function getCategories(type: string) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/private/game/${type}`
  );
  return fetch(url, { headers }).then((response) => response.json());
}
