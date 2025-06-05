"use server";
import {
  Notification,
  TokenNotification,
} from "@/interfaces/notification.interface";
import { handleResponse, ResponserServer } from "../fetch";
import { handleAuth } from "../authServer";

export async function getNotifications(): Promise<
  ResponserServer<Notification[]>
> {
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/notification`;
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "GET",
  });

  return handleResponse(response);
}

export async function getToken(
  uri: string
): Promise<ResponserServer<TokenNotification>> {
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${uri}`;
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "GET",
  });
  return handleResponse(response);
}

export async function readNotifications(): Promise<
  ResponserServer<Notification[]>
> {
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/notification/read`;
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "GET",
  });

  return handleResponse(response);
}
