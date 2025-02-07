import React from "react";

import { getCategories } from "@/lib/api/api";
import { GameCategory } from "@/interfaces";
import Main from "./Main";

export default async function page() {
  const categories: GameCategory[] = await getCategories("category");
  const modes: GameCategory[] = await getCategories("mode");
  const themes: GameCategory[] = await getCategories("theme");

  return (
    <main>
      <Main categories={categories} themes={themes} modes={modes} />
      <div></div>
    </main>
  );
}
