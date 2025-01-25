import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/picture`;
    const headers = new Headers();
    headers.set("Authorization", request.headers.get("Authorization") || "");
    headers.set("Accept", "application/json");

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(data.error, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    const e = error as Error;
    return NextResponse.json(
      {
        message: "Erreur lors de la modification du profil",
        error: e?.message,
      },
      { status: 500 }
    );
  }
}
