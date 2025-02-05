import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party`;
    const headers = new Headers();
    headers.set("Authorization", request.headers.get("Authorization") || "");
    headers.set("Content-Type", "application/json");

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
    const e = error as Error;
    return NextResponse.json(
      {
        message: "Erreur lors de la recherche de parties",
        error: e?.message,
      },
      { status: 500 }
    );
  }
}
