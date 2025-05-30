import { z } from "zod";

export const createReviewCommentSchema = z.object({
  content: z
    .string()
    .min(5, "L'avis doit contenir au moins 5 caractères")
    .max(3000, "L'avis ne doit pas dépasser 3000 caractères"),
  review: z.coerce.number().min(1),
});

export const updateReviewCommentSchema = z.object({
  content: z
    .string()
    .min(5, "L'avis doit contenir au moins 5 caractères")
    .max(3000, "L'avis ne doit pas dépasser 3000 caractères"),
});
