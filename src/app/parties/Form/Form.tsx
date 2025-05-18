"use client";
import React, { useState } from "react";
import FormLocalisation from "./FormLocalisation";
import FormGame from "./FormGame";
import { GameCategory, GameListItem, GameLocalisation } from "@/interfaces";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import Link from "next/link";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import { useRouter } from "next/navigation";

const defaultFormData = {
  city: undefined,
  game: undefined,
  category: undefined,
  theme: undefined,
  mode: undefined,
  rating: undefined,
  playersMin: undefined,
  playersMax: undefined,
  zone: "20",
  date: undefined,
  startTime: undefined,
  endTime: undefined,
  age: "0",
  duration: "0",
};

export default function Form({
  categories,
  themes,
  modes,
  params,
  city,
  game,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
  params: Record<string, string | undefined>;
  city: GameLocalisation | null;
  game: GameListItem | null;
}) {
  const router = useRouter();
  const [formData, setFormData] =
    useState<Record<string, string | undefined>>(params);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {}
  );

  const handleChange = (name: string, value: string | number | null) => {
    setFormData({
      ...formData,
      [name]: value !== null ? String(value) : undefined,
    });
  };

  const handleSubmitAll = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataInstance = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    for (const [key, value] of formDataInstance.entries()) {
      if (value !== null && value !== "") {
        params.set(key, String(value));
      }
    }
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "0") {
        params.set(key, String(value));
      }
    });

    router.push(`/parties?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <form onSubmit={handleSubmitAll}>
      <div className="flex gap-x-10 p-10 flex-wrap gap-y-3">
        <FormLocalisation
          handleChange={handleChange}
          errors={errors}
          formData={formData}
          cityDefault={city}
        />
        <FormGame
          categories={categories}
          themes={themes}
          modes={modes}
          handleChange={handleChange}
          formData={formData}
          gameDefault={game}
        />
      </div>
      <div className="flex justify-center sm:px--10 gap-x-3">
        <div className="flex">
          <div className="px-3">
            <ButtonPrimary
              color={theme.colors.primary[900]}
              label="Rechercher"
              addClass="px-16 py-2"
              type="submit"
            />
          </div>
          <div className="px-3">
            <ButtonSecondary
              color={theme.colors.primary[900]}
              label="Réinitialiser"
              onClick={() => {
                setFormData(defaultFormData);
                setErrors({});
              }}
            />
          </div>
        </div>
      </div>{" "}
      <div className="flex flex-col items-center justify-center mt-3">
        <h4>Vous ne trouvez pas la partie qui vous convient ?</h4>
        <h4>Créez en une!</h4>
        <Link href="/parties/create">
          <ButtonPrimary
            color={theme.colors.primary[600]}
            label="Créer une partie"
            addClass="px-16 py-2"
          />
        </Link>
      </div>
    </form>
  );
}
