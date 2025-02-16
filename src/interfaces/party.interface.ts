import { GameListItem } from "./game.interface";
import { UserProfil } from "./user.interface";

export interface PartyCard {
  id: number;
  title: string;
  playersMax: number;
  playersCount: number;
  cover: string;
  games: Partial<GameListItem>[];
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
  games: GameListItem[];
  city: City;
  date: string;
  author: UserProfil;
  capacity: number;
  participants: UserProfil[];
  closedAt: string;
  joined?: boolean;
  messages?: Message[] | [];
  createdAt: string;
}

export interface Message {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: UserProfil;
}
export interface City {
  name: string;
}
