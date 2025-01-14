export function getImg(url: string) {
  return `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${url}`;
}
