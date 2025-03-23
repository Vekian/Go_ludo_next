import { handleAuth } from "@/lib/api/authServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Vérifier que les champs sont bien remplis
    if (!body.email || !body.password || !body.username) {
      return NextResponse.json(
        { message: "Champs manquants" },
        { status: 400 }
      );
    }

    const headers = await handleAuth();
    // Appel à l'API Symfony pour l'inscription
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/register`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          email: body.email,
          password: body.password,
          username: body.username,
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { message: errorData.message || "Erreur lors de l'inscription" },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "Inscription réussie" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
