"use server";
import { handleAuth } from "../authServer";
import { validateImage } from "../validation/image";

export async function getUser(id: string) {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${id}`
  );
  return fetch(url, { headers }).then((response) => response.json());
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
