import { z } from "zod";

// Définir les formats d'images autorisés
const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

// Schéma de validation du fichier
const imageSchema = z.object({
  avatar: z
    .custom<File>((avatar) => typeof avatar === "object" && "size" in avatar, {
      message: "Fichier invalide.",
    })
    .refine(
      (avatar) => avatar.size <= 2 * 1024 * 1024,
      "L'image doit être inférieure à 2MB"
    ) // Taille max : 2MB
    .refine(
      (avatar) => allowedMimeTypes.includes(avatar.type),
      "Format invalide (JPEG, PNG, WEBP uniquement)"
    ), // Formats autorisés
});

export function validateImage(avatar: File) {
  return imageSchema.safeParse({ avatar });
}
