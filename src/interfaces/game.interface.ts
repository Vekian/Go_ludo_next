import { Creators } from "./creator.interface";

export interface GameListItem {
  id: number;
  name: string;
  cover: string;
  rating: number;
  type: string;
  owned?: boolean;
}

export interface GameLocalisation {
  id: number;
  name: string;
  codePostal: string;
}
export interface GameSearch {
  id: number;
  name: string;
  cover?: string;
  icon?: string;
  type: string;
}

export interface Game {
  id: number;
  name: string;
  rating: number;
  description: string;
  playersMin: number;
  playersMax: number;
  playtimeMin: number;
  playtimeMax: number;
  ageMin: number;
  ageMax: number;
  barCode: string;
  publishedAt: string;
  language: string;
  weight: number;
  height: number;
  type: "base" | "extension";
  length: number;
  width: number;
  edition: number;
  images: ImageGame[];
  categories: GameCategories;
  creators: Creators;
  awards: GameAward[];
  extensions?: GameListItem[];
  content?: string[];
}

export interface ImageGame {
  id: number;
  filepath: string;
  cover: boolean;
}

export interface GameDetails {
  game: Game;
  extensions?: GameListItem[];
}

export interface GameCategories {
  themes?: GameCategory[];
  modes?: GameCategory[];
  categories?: GameCategory[];
}

export interface GameCategory {
  id: number;
  name: string;
  icon?: string;
}

export interface Creator {
  id: number;
  name: string;
  image: string;
  jobs: string[];
}

export interface GameCreator {
  id?: number;
  creator: Creator;
}

export interface GameCreatorToAdd {
  creator: number;
  game: number;
  jobs: string[];
}

export interface GameAward {
  id: number;
  name: string;
  image: string;
}

export interface UserGame {
  owner: number;
  game: number;
}

export interface GameReview {
  id: number;
  content: string;
  rating: number;
  account: UserReview;
  game: GameListItem;
}

export interface UserReview {
  id: number;
  username: string;
  avatar: string;
}

export interface ReviewList {
  items: GameReview[];
  accountReview: GameReview | null;
  totalResults: number;
  page: number;
}
