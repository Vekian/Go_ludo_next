"use server";
import { z } from "zod";
import { handleAuth } from "../authServer";
import { validateImage } from "../validation/image";

const GenderEnum = z.enum(["Homme", "Femme"]);

const schema = z.object({
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

export async function getUser(id: string) {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${id}`
  );
  return fetch(url, { headers }).then((response) => response.json());
}

export async function updateProfil(formData: FormData, userId: number) {
  const validatedFields = schema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Impossible de modifier le profil",
      ok: false,
    };
  }

  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${userId}`;
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    return {
      ok: false,
      message:
        "Impossible de modifier le profil, veuillez vérifier vos informations",
    };
  }

  const data = await response.json();
  return {
    ok: true,
    message: "Profil modifié avec succès",
    user: data,
  };
}

export async function uploadAvatar(formData: FormData) {
  const file = formData.get("avatar") as File | null;

  if (!file) {
    return {
      ok: false,
      message: "Aucun fichier reçu.",
      errors: {
        avatar: "Veuillez sélectionner une image",
      },
    };
  }
  const validationResult = validateImage(file);
  if (!validationResult.success) {
    return {
      ok: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  const headers = await handleAuth();
  headers.set("Accept", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/picture`;

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: formData,
  });

  if (!response.ok) {
    return {
      ok: false,
      message: "Impossible d'upload l'image'",
    };
  }
  const data = await response.json();
  return {
    ok: true,
    message: "Image upload avec succès",
    avatar: data.avatar,
  };
}
