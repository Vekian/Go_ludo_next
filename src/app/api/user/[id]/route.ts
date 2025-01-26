import { NextRequest, NextResponse } from "next/server";
import { UserProfil } from "@/interfaces";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const id = (await params).id;
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${id}`
  );
  const headers = new Headers();
  headers.set("Authorization", req.headers.get("Authorization") || "");
  headers.set("Accept", "application/json");
  try {
    const response = await fetch(url.toString(), { headers: headers });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch data from API" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the data in the response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const formData = await request.formData();
    const body: Partial<UserProfil> = Object.fromEntries(formData.entries());
    if (body.age) {
      body.age = Number(body.age);
    }

    const id = (await params).id;

    const url = `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${id}`;
    const headers = new Headers();
    headers.set("Authorization", request.headers.get("Authorization") || "");
    headers.set("Accept", "application/json");

    const response = await fetch(url, {
      headers: headers,
      body: JSON.stringify(body),
      method: "PUT",
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
