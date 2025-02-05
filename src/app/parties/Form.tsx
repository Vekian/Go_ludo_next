"use client";
import React, { useState } from "react";
import FormLocalisation from "./FormLocalisation";
import FormGame from "./FormGame";
import { GameCategory } from "@/interfaces";
import ButtonPrimary from "@/components/button/ButtonPrimary";

export default function Form({
  categories,
  themes,
  modes,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
}) {
  const [formData1, setFormData1] = useState({});
  const [formData2, setFormData2] = useState({});

  const handleForm1Change = (newData) => {
    setFormData1(newData);
  };

  // Fonction pour mettre à jour les données du formulaire 2
  const handleForm2Change = (newData) => {
    setFormData2(newData);
  };

  const handleSubmitAll = () => {
    console.log("Formulaire 1 :", formData1);
    console.log("Formulaire 2 :", formData2);
    // Ici, tu peux envoyer les données à une API
  };
  return (
    <div>
      <div className="flex gap-x-10 p-10">
        <FormLocalisation />
        <FormGame categories={categories} themes={themes} modes={modes} />
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
          />
        </div>
      </div>
    </div>
  );
}
