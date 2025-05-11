"use client";
import React, { useState } from "react";
import FormLocalisation from "./FormLocalisation";
import FormGame from "./FormGame";
import { GameCategory } from "@/interfaces";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { PartyCard } from "@/interfaces/party.interface";
import { theme } from "@/theme/theme";
import { searchParties } from "@/lib/api/server/party";
import Link from "next/link";
import { ListPaginated } from "@/interfaces/paginator.interface";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";

export default function Form({
  categories,
  themes,
  modes,
  setParties,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
  setParties: (parties: ListPaginated<PartyCard> | null) => void;
}) {
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const handleChange = (name: string, value: string | number | null) => {
    const newFormData = formData;
    if (value) {
      formData.set(name, String(value));
    } else {
      formData.delete(name);
    }
    setFormData(newFormData);
  };
  const handleSubmitAll = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await searchParties(formData);

    if (!response.ok) {
      if (response.errors) {
        setErrors(response.errors);
      }
    } else {
      if (response.data) {
        setParties(response.data);
        setErrors(null);
      }
    }
  };
  return (
    <div>
      <div className="flex gap-x-10 p-10 flex-wrap gap-y-3">
        <FormLocalisation handleChange={handleChange} errors={errors} />
        <FormGame
          categories={categories}
          themes={themes}
          modes={modes}
          handleChange={handleChange}
        />
      </div>
      <div className="flex justify-center sm:px--10 gap-x-3">
        <div className="flex">
          <div className="px-3">
            <ButtonPrimary
              color={theme.colors.primary[900]}
              label="Rechercher"
              addClass="px-16 py-2"
              onClick={handleSubmitAll}
            />
          </div>
          <div className="px-3">
            <ButtonSecondary
              color={theme.colors.primary[900]}
              label="Réinitialiser"
              onClick={() => {
                setFormData(new FormData());
                setErrors(null);
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
    </div>
  );
}
