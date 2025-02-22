"use server";
import { z } from "zod";
import { handleAuth } from "../authServer";

const messageData = z.object({
  party: z.coerce.number().min(1),
  content: z.string().min(2, "Le message doit faire au moins 2 caractères"),
});

export async function sendMessage(message: string, partyId: number) {
  const validatedFields = messageData.safeParse({
    content: message,
    party: partyId,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      ok: false,
      message:
        "Impossible d'envoyer le message, veuillez vérifier vos informations",
    };
  }
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party/message`;

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
        "Impossible d'envoyer le message, veuillez vérifier vos informations",
    };
  }
  const data = await response.json();
  return {
    ok: true,
    message: "Message envoyé avec succès",
    data: data,
  };
}
