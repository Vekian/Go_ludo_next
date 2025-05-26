import { GameListItem } from "./game.interface";
import { CityListItem } from "./localisation.interface";

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  age: number;
  firstname: string;
  lastname: string;
  gender: string;
  city: CityListItem;
  avatar: string;
  description: string;
  games: GameListItem[];
  token?: string;
  notifPartyMessage?: boolean;
  notifPartyMember?: boolean;
  notifGameRelease?: boolean;
  notifPartyZone?: boolean;
}

export interface UserProfil {
  user: User;
  games: GameListItem[];
}

export interface UserStatus {
  id: number;
  username: string;
  avatar: string;
}
