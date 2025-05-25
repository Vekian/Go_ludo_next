"use server";
import { User, UserProfil } from "@/interfaces";
import { handleAuth } from "../authServer";
import { handleResponse, handleValidation, ResponserServer } from "../fetch";
import { avatarUserSchema } from "../validation/image";
import { createUserSchema } from "../validation/user";

export async function getUser(
  id: string
): Promise<ResponserServer<UserProfil>> {
  const headers = await handleAuth();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${id}`
  );
  const response = await fetch(url, { headers });

  return handleResponse(response);
}

export async function updateProfil(
  formData: FormData,
  userId: number
): Promise<ResponserServer<User>> {
  const validatedData = handleValidation(
    Object.fromEntries(formData.entries()),
    createUserSchema,
    "Impossible de modifier le profil"
  );
  if (!validatedData.ok) {
    return validatedData as ResponserServer<User>;
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

export async function updateMailProfil(
  formData: FormData,
  userId: number
): Promise<ResponserServer<User>> {
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${userId}`;
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "PATCH",
    body: JSON.stringify(Object.fromEntries(formData.entries())),
  });

  return handleResponse(
    response,
    "Profil modifié avec succès",
    "Impossible de modifier le profil, veuillez vérifier vos informations"
  );
}

export async function sendLinkResetPassword(
  email: string
): Promise<ResponserServer> {
  const headers = await handleAuth();
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/reset-password/send`;
  const response = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify({ email: email }),
  });

  return handleResponse(
    response,
    "Lien de réinitialisation de mot de passe envoyé par mail",
    "Impossible d'envoyer le lien de réinitialisation de mot de passe"
  );
}

export async function resetPassword(
  resetToken: string,
  formData: FormData
): Promise<ResponserServer> {
  if (!(formData.get("password") && formData.get("passwordConfirm"))) {
    return {
      ok: false,
      message: "Impossible de modifier le mot de passe",
      errors: {
        passwordConfirm: ["Les mots de passes ne sont pas indentiques"],
      },
    };
  }
  const headers = await handleAuth();
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/reset-password/${resetToken}`;
  const response = await fetch(url, {
    headers: headers,
    method: "PUT",
    body: JSON.stringify({
      password: formData.get("password"),
    }),
  });

  return handleResponse(
    response,
    "Mot de passe modifié avec succès",
    "Impossible de modifier le mot de passe"
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
    { avatar: file },
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
