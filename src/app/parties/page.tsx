import React from "react";

import { getCategories } from "@/lib/api/api";
import { GameCategory } from "@/interfaces";
import Form from "./Form";

export default async function page() {
  const categories: GameCategory[] = await getCategories("category");
  const modes: GameCategory[] = await getCategories("mode");
  const themes: GameCategory[] = await getCategories("theme");
  return (
    <main>
      <Form categories={categories} themes={themes} modes={modes} />
    </main>
  );
}
