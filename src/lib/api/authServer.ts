"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";

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
export async function handleAuthAdmin(idUser: number, session: Session | null) {
  if (!session) {
    return false;
  } else if (session.user.roles.includes("ROLE_ADMIN")) {
    return true;
  } else if (Number(session.user.id) === idUser) {
    return true;
  }
  return false;
}
