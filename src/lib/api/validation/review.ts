import { z } from "zod";

export const createReviewSchema = z.object({
  content: z
    .string()
    .max(3000, "L'avis ne doit pas dépasser 3000 caractères")
    .optional()
    .nullable(),
  rulesDifficulty: z.coerce
    .number()
    .min(0)
    .max(100, "100 maxi")
    .optional()
    .nullable(),
  setupTime: z.coerce
    .number()
    .min(0)
    .max(100, "100 maxi")
    .optional()
    .nullable(),
  rating: z.preprocess(
    (val) => (val === "" || val === null ? undefined : Number(val)), // Convertit en `number` sauf si vide/null
    z
      .number({
        required_error: "La note est requise.",
        invalid_type_error: "La note doit être un nombre.",
      })
      .min(0, "La note doit être entre 0 et 5.")
      .max(5, "La note doit être entre 0 et 5.")
  ),
  game: z.coerce.number().min(1),
});
