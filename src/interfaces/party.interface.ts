import { GameCard } from "./game.interface";
import { UserProfil } from "./user.interface";

export interface PartyCard {
  id: number;
  title: string;
  playersMax: number;
  playersCount: number;
  cover: string;
  games: Partial<GameCard>[];
  city: City;
  date: string;
  author: UserProfil;
  capacity: number;
  participants: number;
}

export interface Party {
  id: number;
  title: string;
  description: string;
  playersMax: number;
  playersCount: number;
  cover: string;
  games: GameCard[];
  city: City;
  date: string;
  author: UserProfil;
  capacity: number;
  participants: UserProfil[];
  closedAt: string;
  joined?: boolean;
}

export interface City {
  name: string;
}
