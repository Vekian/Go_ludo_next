import { GameListItem } from "./game.interface";

export interface UserProfil {
  id: number;
  username: string;
  email: string;
  roles: string[];
  age: number;
  firstName: string;
  lastName: string;
  gender: string;
  avatar: string;
  description: string;
  games: GameListItem[];
}
