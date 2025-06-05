"use server";
import { NotificationsInit } from "@/interfaces/notification.interface";
import { handleResponse, ResponserServer } from "../fetch";
import { handleAuth } from "../authServer";

export async function getNotifications(): Promise<
  ResponserServer<NotificationsInit>
> {
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/notification`;
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "GET",
  });

  return handleResponse(response);
}

export async function readNotifications(): Promise<
  ResponserServer<NotificationsInit>
> {
  const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/notification/read`;
  const headers = await handleAuth();
  const response = await fetch(url, {
    headers: headers,
    method: "GET",
  });

  return handleResponse(response);
}
