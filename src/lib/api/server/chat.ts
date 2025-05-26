"use server";
import { Message } from "@/interfaces/party.interface";
import { handleAuth } from "../authServer";
import { handleResponse, handleValidation, ResponserServer } from "../fetch";
import { messageCreateSchema, messageEditSchema } from "../validation/chat";

export async function sendMessage(
  message: string,
  partyId: number
): Promise<ResponserServer<Message>> {
  const dataValidated = handleValidation(
    {
      party: partyId,
      content: message,
    },
    messageCreateSchema,
    "Impossible d'envoyer le message, veuillez vérifier vos informations"
  );

  if (!dataValidated.ok && !dataValidated.data) {
    return dataValidated as ResponserServer<Message>;
  }
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party/message`;
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(dataValidated.data),
  });

  return handleResponse(
    response,
    "Message envoyé avec succès",
    "Impossible d'envoyer le message, veuillez vérifier vos informations"
  );
}

export async function updateMessage(
  message: string,
  messageId: number
): Promise<ResponserServer<Message>> {
  const dataValidated = handleValidation(
    {
      content: message,
    },
    messageEditSchema,
    "Impossible de modifier le message, veuillez vérifier vos informations"
  );

  if (!dataValidated.ok) {
    return dataValidated as ResponserServer<Message>;
  }

  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party/message/${messageId}`;
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(dataValidated.data),
  });

  return handleResponse(
    response,
    "Message modifié avec succès",
    "Impossible de modifier le message, veuillez vérifier vos informations"
  );
}

export async function deleteMessage(
  messageId: number
): Promise<ResponserServer> {
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party/message/${messageId}`;

  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "DELETE",
  });

  return handleResponse(
    response,
    "Message supprimé avec succès",
    "Impossible de supprimer le message"
  );
}
