"use client";
import React, { useState } from "react";
import FormLocalisation from "./FormLocalisation";
import FormGame from "./FormGame";
import { GameCategory } from "@/interfaces";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { z } from "zod";

const formSchema = z.object({
  age: z.coerce.number().nullable(),
  city: z.coerce.number().gt(0, "Veuillez choisir une ville valide."),
  zone: z.coerce.number().nullable(),
  playersMin: z.coerce.number().nullable(),
  playersMax: z.coerce.number().nullable(),
  date: z.string().date().nullable(),
  startTime: z.string().time().nullable(),
  endTime: z.string().time().nullable(),
  game: z.coerce.number().nullable(),
  category: z.coerce.number().nullable(),
  theme: z.coerce.number().nullable(),
  mode: z.coerce.number().nullable(),
  duration: z.coerce.number().nullable(),
  rating: z.coerce.number().nullable(),
});

export type FormData = z.infer<typeof formSchema>;

export default function Form({
  categories,
  themes,
  modes,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
}) {
  const [formData, setFormData] = useState<FormData>({
    age: null,
    city: 0,
    zone: null,
    playersMin: null,
    playersMax: null,
    game: null,
    category: null,
    theme: null,
    mode: null,
    duration: null,
    rating: null,
    startTime: null,
    endTime: null,
    date: null,
  });
  const [errors, setErrors] = useState<{ [key in keyof FormData]?: string }>(
    {}
  );

  const handleChange = (name: string, value: string | number | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmitAll = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const result = formSchema.safeParse(formData);
    if (result.success) {
      // Si tout est valide, on affiche les données soumises
      setErrors({});
      const response = await fetch("/api/party", {
        body: JSON.stringify(result.data),
      });
      if (response.ok) {
        const parties = await response.json();
        console.log(parties);
      }
    } else {
      const newErrors: { [key in keyof FormData]?: string } = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0] as keyof FormData] = err.message;
      });
      setErrors(newErrors);
    }
  };
  return (
    <div>
      <div className="flex gap-x-10 p-10">
        <FormLocalisation handleChange={handleChange} errors={errors} />
        <FormGame
          categories={categories}
          themes={themes}
          modes={modes}
          handleChange={handleChange}
        />
      </div>
      <div className="flex justify-center px--10 gap-x-10">
        <div className="flex-1 flex justify-end">
          <ButtonPrimary
            color="primary-600"
            label="Créer une partie"
            addClass="px-16 py-2"
          />
        </div>
        <div className="flex-1 justify-start">
          <ButtonPrimary
            color="primary-900"
            label="Rechercher"
            addClass="px-16 py-2"
            onClick={handleSubmitAll}
          />
        </div>
      </div>
    </div>
  );
}
