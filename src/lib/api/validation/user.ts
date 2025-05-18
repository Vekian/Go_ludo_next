import { z } from "zod";

const GenderEnum = z.enum(["Homme", "Femme"]);

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "Le pseudo doit faire au moins 3 caractères")
    .max(15, "Le pseudo ne doit pas dépasser 15 caractères"),
  firstname: z.string().max(50, "Le nom ne doit pas dépasser 50 caractères"),
  lastname: z.string().max(50, "Le prénom ne doit pas dépasser 50 caractères"),
  gender: GenderEnum,
  description: z
    .string()
    .max(3000, "La description ne doit pas dépasser 3000 caractères"),
  age: z.coerce
    .number()
    .min(1, "Pas d'écran lorsqu'on est si jeune")
    .max(150, "Nul n'est aussi vieux"),
});
