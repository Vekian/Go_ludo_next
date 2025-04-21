"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import InputText from "@/components/ui/input/InputText";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import CustomCircularLoader from "@/components/ui/loader/CustomCircularLoader";
import FormError from "@/components/ui/error/FormError";
export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const handleChange = (field: string, value: string | null) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.errors) {
          setErrors(data.errors);
          return;
        } else {
          throw new Error(data.message || "Erreur lors de l'inscription");
        }
      }

      // Connexion automatique après inscription
      const result = await signIn("credentials", {
        email: userData.email,
        password: userData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      const routeToGo = searchParams.get("callbackUrl");
      setErrors(null);
      router.push(routeToGo ?? "/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-10 p-6 bg-white rounded-lg flex flex-col items-center">
      <h1 className="text-2xl text-center font-bold mb-4">Créer un compte</h1>

      <form onSubmit={handleSubmit} className="space-y-4 px-6 w-1/2">
        <div className="flex flex-col">
          <label>Nom utilisateur</label>
          <InputText
            id="username"
            defaultValue={userData.username}
            onChange={(value) => handleChange("username", value)}
          />
          {errors?.username && (
            <FormError errors={errors.username} name="username" />
          )}
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <InputText
            id="email"
            type="email"
            defaultValue={userData.email}
            onChange={(value) => handleChange("email", value)}
          />
          {errors?.email && <FormError errors={errors.email} name="email" />}
        </div>
        <div className="flex flex-col">
          <label>Mot de passe</label>
          <InputText
            id="password"
            type="password"
            defaultValue={userData.password}
            onChange={(value) => handleChange("password", value)}
          />
          {errors?.password && (
            <FormError errors={errors.password} name="password" />
          )}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex w-full justify-center">
          {loading ? (
            <div className="text-center mt-6">
              <CustomCircularLoader />
            </div>
          ) : (
            <ButtonPrimary
              label="S'inscrire"
              color={theme.colors.primary[600]}
            />
          )}
        </div>
      </form>
    </div>
  );
}
