import React from "react";
import { getCategories } from "@/lib/api/server/category";
import Form from "./Form";

export default async function page() {
  const [categories, modes, themes] = await Promise.all([
    getCategories("category"),
    getCategories("mode"),
    getCategories("theme"),
  ]);

  if (!categories.data || !modes.data || !themes.data) {
    throw new Error("Categories, modes or themes not found");
  }

  return (
    <div className="h-full w-full p-2 lg:p-4 flex flex-col items-center gap-y-5">
      <div className="bg-white rounded-lg px-6 lg:px-12 py-6 text-center flex flex-col items-center gap-y-4">
        <h1>Création de partie</h1>
        <div className="text-start">
          <p>
            Propose des jeux que tu aimes ou que tu veux essayer et rencontre
            des joueurs qui habitent pas loin de chez toi! <br />
            Après avoir créé la partie, tu seras notifié si des joueurs
            rejoignent ton groupe de jeu. <br />
            Tu peux préciser ou non une date de rencontre, c’est toi qui
            choisis.
          </p>
        </div>
      </div>
      <Form
        categories={categories.data}
        themes={themes.data}
        modes={modes.data}
      />
    </div>
  );
}
