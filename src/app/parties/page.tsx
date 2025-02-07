import React from "react";

import { getCategories } from "@/lib/api/api";
import { GameCategory } from "@/interfaces";
import Main from "./Main";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const categories: GameCategory[] = await getCategories("category");
  const modes: GameCategory[] = await getCategories("mode");
  const themes: GameCategory[] = await getCategories("theme");

  const params = await searchParams;

  return (
    <main>
      <Main
        categories={categories}
        themes={themes}
        modes={modes}
        params={params}
      />
      <div></div>
    </main>
  );
}
