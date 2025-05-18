"use server";
import { handleAuth } from "../authServer";
import { handleResponse, handleValidation, ResponserServer } from "../fetch";
import { avatarUserSchema } from "../validation/image";
import { createUserSchema } from "../validation/user";

export async function getUser(id: string): Promise<ResponserServer> {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${id}`
  );
  return fetch(url, { headers }).then((response) => response.json());
}

export async function updateProfil(formData: FormData, userId: number) {
  const validatedData = handleValidation(
    Object.fromEntries(formData.entries()),
    createUserSchema,
    "Impossible de modifier le profil"
  );
  if (!validatedData.ok) {
    return validatedData;
  }

  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${userId}`;
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(validatedData.data),
  });

  return handleResponse(
    response,
    "Profil modifié avec succès",
    "Impossible de modifier le profil, veuillez vérifier vos informations"
  );
}

export async function uploadAvatar(
  formData: FormData
): Promise<ResponserServer> {
  const file = formData.get("avatar") as File | null;

  if (!file) {
    return {
      ok: false,
      message: "Aucun fichier reçu.",
      errors: {
        avatar: ["Veuillez sélectionner une image"],
      },
    };
  }
  const validatedData = handleValidation(
    { file: file },
    avatarUserSchema,
    "Impossible d'upload l'image'"
  );
  if (!validatedData.ok) {
    return validatedData;
  }
  const headers = await handleAuth();
  headers.set("Accept", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/picture`;

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: formData,
  });

  return handleResponse(
    response,
    "Image upload avec succès",
    "Impossible d'upload l'image'"
  );
}
