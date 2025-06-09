import { GameListItem } from "./game.interface";
import { CityListItem } from "./localisation.interface";
import { User } from "./user.interface";

export interface PartyCard {
  id: number;
  title: string;
  playersMax: number;
  cover: string;
  games: Partial<GameListItem>[];
  city: CityListItem;
  meetingDate: string;
  meetingTime: string;
  author: User;
  participants: number;
  ageMax: number;
  ageMin: number;
  score?: number;
  distance?: number;
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
  city: CityListItem;
  meetingDate: string;
  meetingTime: string;
  author: User;
  participants: User[];
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
  author: User;
}
