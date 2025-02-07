"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function handleAuth() {
  const headers = new Headers();

  const session = await getServerSession(authOptions);
  if (session?.user.token) {
    headers.set("Authorization", `Bearer ${session?.user.token}`);
  } else if (process.env.KEY_SYMFONY_API) {
    headers.append("X-AUTH-TOKEN", process.env.KEY_SYMFONY_API);
  }
  return headers;
}
