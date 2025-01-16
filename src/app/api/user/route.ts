import { UserProfil } from "@/interfaces";
import { User } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token || !token.user) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const body: Partial<UserProfil> = Object.fromEntries(formData.entries());
    if (body.age) {
      body.age = Number(body.age);
    }

    const user = token.user as User;

    const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${user.id}`;
    const headers = new Headers({
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    });

    const response = await fetch(url, {
      headers: headers,
      body: JSON.stringify(body),
      method: "PUT",
    });

    const data = await response.json();
    if (!response.ok) {
      // Gérer les erreurs de l'API Symfony

      return NextResponse.json(data.error, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
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
