import { Param } from "@/interfaces";
import { User } from "next-auth";

const headers = new Headers();

if (process.env.KEY_SYMFONY_API) {
  headers.append("X-AUTH-TOKEN", process.env.KEY_SYMFONY_API);
}
export function getGames(params: Param[] = [], user?: User | null) {
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

  if (user) {
    headers.append("Authorization", `Bearer ${user.token}`);
  }

  return fetch(url, {
    headers: headers,
  }).then((response) => response.json());
}

export function getGame(id: number, type: string) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}/${id}`
  );
  return fetch(url, { headers }).then((response) => response.json());
}

export function getCategories(type: string) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}`
  );
  return fetch(url, { headers }).then((response) => response.json());
}

export async function getReviews(gameId: number, token: string | undefined) {
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review/${gameId}`
  );
  return fetch(url, { headers }).then((response) => response.json());
}
