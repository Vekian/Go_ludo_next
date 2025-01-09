export function getGames() {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/base`
  );
  return fetch(url).then((response) => response.json());
}

export function getGame(id: number, type: string) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/${type}/${id}`
  );
  return fetch(url).then((response) => response.json());
}
