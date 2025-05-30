import { handleAuth } from "../authServer";
import { handleResponse, handleValidation, ResponserServer } from "../fetch";
import {
  createReviewCommentSchema,
  updateReviewCommentSchema,
} from "../validation/reviewComment";

export async function addReviewComment(
  formData: FormData
): Promise<ResponserServer> {
  const cleanedData = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map(
      ([key, value]) => [key, value === "" ? null : value]
    )
  );
  const validatedData = handleValidation(
    cleanedData,
    createReviewCommentSchema,
    "Impossible de valider le commentaire"
  );

  if (!validatedData.ok) {
    return validatedData as ResponserServer;
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review-comment`
  );
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(validatedData.data),
  });

  return handleResponse(
    response,
    "Commentaire ajouté avec succès",
    "Impossible d'ajouter le commentaire, veuillez vérifier vos informations"
  );
}

export async function updateReviewComment(
  formData: FormData,
  commentId: number
): Promise<ResponserServer> {
  const cleanedData = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map(
      ([key, value]) => [key, value === "" ? null : value]
    )
  );
  const validatedData = handleValidation(
    cleanedData,
    updateReviewCommentSchema,
    "Impossible de valider le commentaire"
  );

  if (!validatedData.ok) {
    return validatedData as ResponserServer;
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review-comment/${commentId}`
  );
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(validatedData.data),
  });

  return handleResponse(
    response,
    "Commentaire ajouté avec succès",
    "Impossible d'ajouter le commentaire, veuillez vérifier vos informations"
  );
}
export async function deleteReviewComment(
  reviewId: number
): Promise<ResponserServer> {
  const headers = await handleAuth();
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/game/review-comment/${reviewId}`;

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
