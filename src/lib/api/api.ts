import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Param } from "@/interfaces";
import { getServerSession } from "next-auth";

const headers = new Headers();

if (process.env.KEY_SYMFONY_API) {
  headers.append("X-AUTH-TOKEN", process.env.KEY_SYMFONY_API);
}
export async function getGames(params: Param[] = []) {
  const session = await getServerSession(authOptions);
  if (session?.user.token) {
    headers.set("Authorization", `Bearer ${session?.user.token}`);
  }
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

export async function getReviews(gameId: number) {
  const session = await getServerSession(authOptions);
  if (session?.user.token) {
    headers.set("Authorization", `Bearer ${session?.user.token}`);
  }
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review/${gameId}`
  );
  return fetch(url, { headers }).then((response) => response.json());
}
