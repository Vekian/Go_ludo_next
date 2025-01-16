import { ImageInterface } from "./ui.interface";

export interface GameCard {
  id: number;
  name: string;
  cover: ImageInterface;
  rating: number;
  type: string;
  owned?: boolean;
}

export interface GameSearch {
  id: number;
  name: string;
  cover?: ImageInterface;
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
  playtimeMin: string;
  playtimeMax: string;
  ageMin: number;
  ageMax: number;
  barCode: string;
  publishedAt: string;
  imageGames: ImageInterface[];
  categories: GameCategories;
  creators: GameCreators;
  awards: GameAward[];
  extensions?: GameCard[];
}

export interface GameCategories {
  themes?: GameCategory[];
  modes?: GameCategory[];
  categories?: GameCategory[];
}

export interface GameCategory {
  id: number;
  name: string;
  icon: string;
}

export interface GameCreators {
  authors?: GameCreator[];
  editors?: GameCreator[];
  illustrators?: GameCreator[];
}

export interface GameCreator {
  id: number;
  name: string;
  image: string;
}

export interface GameAward {
  id: number;
  name: string;
  logo: string;
}

export interface UserGame {
  owner: number;
  game: number;
}

export interface GameReview {
  id: number;
  content: string;
  rating: number;
  game: number;
  account: UserReview;
}

export interface UserReview {
  id: number;
  username: string;
  avatar: string;
}
