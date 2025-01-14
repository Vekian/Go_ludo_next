export function getUser(id: string, jwt: string) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${id}`
  );
  const headers = new Headers({
    Authorization: `Bearer ${jwt}`,
  });
  return fetch(url, { headers }).then((response) => response.json());
}
