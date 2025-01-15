import { NextRequest, NextResponse } from "next/server";
import { headers as getHeaders } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const headersList = await getHeaders();
  const authorization = headersList.get("Authorization");

  if (!authorization) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
  const id = (await params).id;
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/user/${id}`
  );
  const headers = new Headers({
    Authorization: authorization,
  });
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
    // Handle any errors that occur during the fetch or JSON parsing
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
