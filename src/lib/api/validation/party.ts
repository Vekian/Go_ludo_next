import { z } from "zod";

export const searchPartySchema = z.object({
  age: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
  city: z.coerce.number().optional(),
  zone: z.coerce.number().optional(),
  playersMin: z.coerce.number().optional(),
  playersMax: z.coerce.number().optional(),
  date: z.string().date().optional().nullable(),
  startTime: z.string().optional().nullable(),
  endTime: z.string().optional().nullable(),
  game: z.coerce.number().optional(),
  category: z.coerce.number().optional(),
  theme: z.coerce.number().optional(),
  mode: z.coerce.number().optional(),
  duration: z.coerce.number().optional(),
  rating: z.coerce.number().optional(),
});

export const createPartySchema = z.object({
  ageMin: z.coerce
    .number()
    .min(18, "L'application est réservée aux gens majeurs"),
  ageMax: z.coerce
    .number()
    .min(18, "L'application est réservée aux gens majeurs"),
  city: z.coerce.number().min(1, "Veuillez choisir une ville").default(0),
  latitude: z.coerce
    .number()
    .min(-90, "Mauvaise coordonnée")
    .max(90, "Mauvaise coordonnées"),
  longitude: z.coerce
    .number()
    .min(-180, "Mauvaise coordonnée")
    .max(180, "Mauvaise coordonnées"),
  playersMin: z.coerce.number(),
  playersMax: z.coerce.number(),
  games: z
    .array(z.number().min(1, "Veuillez choisir au moins un jeu"))
    .default([0]),
  meetingDate: z.union([z.coerce.date(), z.null()]).optional(),
  meetingTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format invalide (HH:MM)")
    .optional()
    .nullable(),
  title: z
    .string()
    .min(4, "4 caractères minimum")
    .max(300, "300 caractères maximum")
    .default(""),

  description: z
    .string()
    .min(4, "4 caractères minimum")
    .max(500, "500 caractères maximum")
    .default(""),
});
