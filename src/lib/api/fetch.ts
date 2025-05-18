import { ZodTypeAny } from "zod";

export interface ResponserServer<T = unknown> {
  ok: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[] | undefined>;
}

export function handleValidation<T extends ZodTypeAny>(
  body: Record<string, unknown>,
  schema: T,
  errorMess?: string
): ResponserServer {
  const validatedFields = schema.safeParse(body);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      ok: false,
      message: errorMess ?? "Erreur, veuillez vérifier vos informations",
    };
  }

  return {
    ok: true,
    data: validatedFields.data,
    message: "",
  };
}

export async function handleResponse<T>(
  response: Response,
  successMess?: string,
  errorMess?: string
): Promise<ResponserServer<T>> {
  if (!response.ok) {
    if (response.status === 422) {
      const data = await response.json();
      return {
        ok: false,
        message: "Erreur lors de la requête",
        data: data,
      };
    }
    return {
      ok: false,
      message: errorMess ?? "Erreur lors de la requête",
    };
  }
  const data = await response.json();
  return {
    ok: true,
    message: successMess ?? "Requête effectuée avec succès",
    data: data as T,
  };
}
