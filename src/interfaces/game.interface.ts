import { ImageInterface } from "./ui.interface";

export interface GameCard {
  id: number;
  name: string;
  cover: ImageInterface;
  rating: number;
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
  author?: GameCreator[];
}

export interface GameCreator {
  id: number;
  name: string;
}
