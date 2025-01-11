import { User } from "next-auth";

export interface UserProfil extends User {
  roles: string[];
  refreshToken: string;
  token: string;
  accessTokenExpires: number;
}
