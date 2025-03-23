import { handleAuth } from "@/lib/api/authServer";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  username: z
    .string()
    .min(3, "3 caractères minimum")
    .max(15, "15 caractères maximum"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir un chiffre")
    .regex(
      /[@$!%*?&]/,
      "Le mot de passe doit contenir un caractère spécial (@$!%*?&)"
    ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedFields = registerSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Impossible de créer la partie",
          errors: validatedFields.error.flatten().fieldErrors,
        },
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
