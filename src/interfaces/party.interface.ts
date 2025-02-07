import { GameCard } from "./game.interface";
import { UserProfil } from "./user.interface";

export interface PartyCard {
    id: number;
    title: string;
    description: string;
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

export interface City {
    name: string;
}