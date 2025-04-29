import { GameCreator } from "./game.interface";

export enum CreatorJob {
  Author = "author",
  Illustrator = "illustrator",
  Distributor = "distributor",
  Editor = "editor",
  Traductor = "traductor",
}

export const jobNames: Record<CreatorJob, string> = {
  [CreatorJob.Author]: "Auteur",
  [CreatorJob.Illustrator]: "Illustrateur",
  [CreatorJob.Distributor]: "Distributeur",
  [CreatorJob.Editor]: "Éditeur",
  [CreatorJob.Traductor]: "Traducteur",
};

export type Creators = {
  [key in CreatorJob]?: GameCreator[];
};
