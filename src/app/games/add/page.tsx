import React from "react";
import FormGame from "@/components/form/FormGame";

export default function page() {
  return (
    <div className="lg:p-4 pt-10 flex flex-col gap-y-6">
      <div className="flex flex-col bg-white rounded-lg flex-wrap p-10  items-center gap-y-6">
        <div>
          <h2>Ajouter une fiche de jeu</h2>
        </div>
      </div>
      <FormGame />
    </div>
  );
}
