import { GameListItem } from "./game.interface";
import { UserProfil } from "./user.interface";

export interface PartyCard {
  id: number;
  title: string;
  playersMax: number;
  cover: string;
  games: Partial<GameListItem>[];
  city: City;
  meetingDate: string;
  meetingTime: string;
  author: UserProfil;
  participants: number;
  ageMax: number;
  ageMin: number;
}

export interface Party {
  id: number;
  title: string;
  description: string;
  playersMax: number;
  playersMin: number;
  playersCount: number;
  cover: string;
  games: GameListItem[];
  city: City;
  meetingDate: string;
  meetingTime: string;
  author: UserProfil;
  participants: UserProfil[];
  closedAt: string;
  joined?: boolean;
  messages?: Message[] | [];
  createdAt: string;
  ageMax: number;
  ageMin: number;
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
