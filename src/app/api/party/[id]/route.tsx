import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const id = (await params).id;

    const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/party/${id}`;
    const headers = new Headers();
    headers.set("Authorization", request.headers.get("Authorization") || "");
    headers.set("Content-Type", "application/json");

    const response = await fetch(url, {
      headers: headers,
      method: "GET",
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(data.error, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const e = error as Error;
    return NextResponse.json(
      {
        message: "Erreur lors de l'envoi du commentaire",
        error: e?.message,
      },
      { status: 500 }
    );
  }
}
