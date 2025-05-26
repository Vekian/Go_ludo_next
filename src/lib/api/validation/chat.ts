import { z } from "zod";

export const messageCreateSchema = z.object({
  party: z.coerce.number().min(1),
  content: z
    .string()
    .min(2, "Le message doit faire au moins 2 caractères")
    .max(20000, "Le message ne peut dépasser 20 000 caractères"),
});
export const messageEditSchema = z.object({
  content: z
    .string()
    .min(2, "Le message doit faire au moins 2 caractères")
    .max(20000, "Le message ne peut dépasser 20 000 caractères"),
});
