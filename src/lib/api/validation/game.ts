import { z } from "zod";

export const createGameSchema = z.object({
  ageMin: z.coerce.number(),
  ageMax: z.coerce.number(),
  playersMin: z.coerce.number(),
  playersMax: z.coerce.number(),
  playtimeMin: z.coerce.number(),
  playtimeMax: z.coerce.number(),
  language: z.string(),
  categories: z
    .array(z.coerce.number().min(1, "Catégorie invalide"))
    .default([0]),
  name: z
    .string()
    .min(4, "4 caractères minimum")
    .max(300, "300 caractères maximum")
    .default(""),

  description: z
    .string()
    .min(4, "4 caractères minimum")
    .max(5000, "5000 caractères maximum")
    .default(""),
});
export const updateGameSchema = z.object({
  weight: z.coerce.number().nullable().optional(),
  length: z.coerce.number().nullable().optional(),
  height: z.coerce.number().nullable().optional(),
  width: z.coerce.number().nullable().optional(),
  content: z.array(z.string()),
  publishedAt: z.union([z.coerce.date(), z.null()]).optional(),
});
