import { GameListItem } from "./game.interface";

export interface UserProfil {
  id: number;
  username: string;
  email: string;
  roles: string[];
  age: number;
  firstname: string;
  lastname: string;
  gender: string;
  avatar: string;
  description: string;
  games: GameListItem[];
}
