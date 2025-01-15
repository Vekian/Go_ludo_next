import { User } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token || !token.user) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  try {
    const user = token.user as User;
    const body = await request.json();
    body.owner = user.id;

    const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/game`;
    const headers = new Headers({
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    });

    const response = await fetch(url, {
      headers: headers,
      body: JSON.stringify(body),
      method: "POST",
    });

    if (!response.ok) {
      // Gérer les erreurs de l'API Symfony
      const errorMessage = await response.json();
      return NextResponse.json(errorMessage.error, { status: response.status });
    }

    return NextResponse.json("", { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erreur dans la route:", error.message);
      return NextResponse.json(
        {
          message: "Erreur lors de la modification du profil",
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Cas où l'erreur n'est pas une instance d'Error
    console.error("Erreur inconnue:", error);
    return NextResponse.json(
      { message: "Erreur inconnue lors de la modification du profil" },
      { status: 500 }
    );
  }
}
