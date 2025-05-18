import { z } from "zod";

export const imageGameSchema = z.object({
  file: z
    .custom<File>((file) => typeof file === "object" && "size" in file, {
      message: "Fichier invalide.",
    })
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "L'image doit être inférieure à 2MB"
    ) // Taille max : 2MB
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
          file.type
        ),
      "Format invalide (JPEG, PNG, WEBP uniquement)"
    ), // Formats autorisés
});

// Schéma de validation du fichier
export const avatarUserSchema = z.object({
  avatar: z
    .custom<File>((avatar) => typeof avatar === "object" && "size" in avatar, {
      message: "Fichier invalide.",
    })
    .refine(
      (avatar) => avatar.size <= 2 * 1024 * 1024,
      "L'image doit être inférieure à 2MB"
    ) // Taille max : 2MB
    .refine(
      (avatar) =>
        ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
          avatar.type
        ),
      "Format invalide (JPEG, PNG, WEBP uniquement)"
    ), // Formats autorisés
});
