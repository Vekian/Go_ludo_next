"use server";
import { ReviewList } from "@/interfaces";
import { handleAuth } from "../authServer";
import { handleResponse, handleValidation, ResponserServer } from "../fetch";
import { createReviewSchema } from "../validation/review";

export async function getReviews(
  gameId: number,
  reviewsPage: number
): Promise<ResponserServer<ReviewList>> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review/${gameId}?page=${reviewsPage}`
  );
  const headers = await handleAuth();
  const response = await fetch(url, { headers });

  return handleResponse(response);
}

export async function addReview(formData: FormData): Promise<ResponserServer> {
  const validatedData = handleValidation(
    Object.fromEntries(formData.entries()),
    createReviewSchema,
    "Impossible de valider l'avis"
  );

  if (!validatedData.ok) {
    return validatedData as ResponserServer;
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review`
  );
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(validatedData.data),
  });

  return handleResponse(
    response,
    "Avis ajouté avec succès",
    "Impossible d'ajouter l'avis, veuillez vérifier vos informations"
  );
}

export async function updateReview(
  formData: FormData,
  reviewId: number
): Promise<ResponserServer> {
  const validatedData = handleValidation(
    Object.fromEntries(formData.entries()),
    createReviewSchema,
    "Impossible de modifier l'avis"
  );

  if (!validatedData.ok) {
    return validatedData as ResponserServer;
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review/${reviewId}`
  );
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(validatedData.data),
  });

  return handleResponse(
    response,
    "Avis modifié avec succès",
    "Impossible de modifier l'avis, veuillez vérifier vos informations"
  );
}

export async function deleteReview(reviewId: number): Promise<ResponserServer> {
  const headers = await handleAuth();
  headers.set("Content-Type", "application/json");
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review/${reviewId}`;

  const response = await fetch(url, {
    headers: headers,
    method: "DELETE",
  });

  return handleResponse(
    response,
    "Avis supprimé avec succès",
    "Impossible de supprimer l'avis"
  );
}
