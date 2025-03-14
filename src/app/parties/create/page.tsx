import React from "react";
import { GameCategory } from "@/interfaces";
import { getCategories } from "@/lib/api/server/category";
import Form from "./Form";

export default async function page() {
  const categories: GameCategory[] = await getCategories("category");
  const modes: GameCategory[] = await getCategories("mode");
  const themes: GameCategory[] = await getCategories("theme");
  return (
    <div className="h-full w-full p-4 flex flex-col items-center gap-y-5">
      <div className="bg-white rounded-lg  px-12 py-6 text-center flex flex-col items-center gap-y-4">
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
      <Form categories={categories} themes={themes} modes={modes} />
    </div>
  );
}
