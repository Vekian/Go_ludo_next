import { Game } from "@/interfaces";

export function getBaseUrl(game: Game) {
  return `${game.type === "base" ? "game" : game.type}s/`;
}
