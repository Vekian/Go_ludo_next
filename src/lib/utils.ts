import { GameListItem } from "@/interfaces";

export function getImg(url: string) {
  return `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${url}`;
}

export function getLinkGame(game: GameListItem): string {
  if (game.type === "base") {
    return `/games/${game.id}`;
  } else {
    return `/${game.type}s/${game.id}`;
  }
}

export function truncateText(text: string) {
  if (text.length <= 14) return text;
  return text.substring(0, 14) + "...";
}
