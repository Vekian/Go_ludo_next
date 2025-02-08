import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party/message`;
    const headers = new Headers();
    headers.set("Authorization", request.headers.get("Authorization") || "");
    headers.set("Content-Type", "application/json");

    const response = await fetch(url, {
      headers: headers,
      body: JSON.stringify(body),
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      // Gérer les erreurs de l'API Symfony
      return NextResponse.json(data.error, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
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
