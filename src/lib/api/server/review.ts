"use server";
import { z } from "zod";
import { handleAuth } from "../authServer";

const schema = z.object({
  content: z
    .string()
    .max(3000, "L'avis ne doit pas dépasser 3000 caractères")
    .optional()
    .nullable(),
  rating: z.preprocess(
    (val) => (val === "" || val === null ? undefined : Number(val)), // Convertit en `number` sauf si vide/null
    z
      .number({
        required_error: "La note est requise.",
        invalid_type_error: "La note doit être un nombre.",
      })
      .min(1, "La note doit être entre 1 et 5.")
      .max(5, "La note doit être entre 1 et 5.")
  ),
  game: z.coerce.number().min(1),
});

export async function getReviews(gameId: number, reviewsPage: number) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review/${gameId}?page=${reviewsPage}`
  );
  const headers = await handleAuth();
  const response = await fetch(url, { headers });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function addReview(formData: FormData) {
  const validatedFields = schema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Impossible de valider l'avis",
      ok: false,
    };
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review`
  );
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    return {
      ok: false,
      message:
        "Impossible d'ajouter l'avis, veuillez vérifier vos informations",
    };
  }

  return {
    ok: true,
    message: "Avis ajouté avec succès",
  };
}

export async function updateReview(formData: FormData, reviewId: number) {
  const validatedFields = schema.safeParse({
    content: formData.get("content"),
    rating: formData.get("rating"),
    game: formData.get("game"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Impossible de modifier l'avis",
      ok: false,
    };
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review/${reviewId}`
  );
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
        "Impossible de modifier l'avis, veuillez vérifier vos informations",
    };
  }

  return {
    ok: true,
    message: "Avis modifié avec succès",
  };
}

export async function deleteReview(reviewId: number) {
  const headers = await handleAuth();
  headers.set("Content-Type", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review/${reviewId}`;

  const response = await fetch(url, {
    headers: headers,
    method: "DELETE",
  });

  if (!response.ok) {
    return {
      message: "Erreur lors du retrait de l'avis",
      ok: false,
    };
  }

  return { message: "Avis supprimé", ok: true };
}
