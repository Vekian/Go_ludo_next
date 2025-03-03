import React from "react";
import CategorySelect from "../../input/CategorySelect";
import { GameCategory } from "@/interfaces";
import { getCategories } from "@/lib/api/server/category";
import { theme } from "@/theme/theme";

export default async function CategoryFilters() {
  const categories: GameCategory[] = await getCategories("category");
  const modes: GameCategory[] = await getCategories("mode");
  const themes: GameCategory[] = await getCategories("theme");

  return (
    <>
      <CategorySelect
        label="Catégorie"
        options={categories}
        color={theme.colors.primary[500]}
        width={180}
        name="category"
      />
      <CategorySelect
        label="Thème"
        options={themes}
        color={theme.colors.neutral[500]}
        width={180}
        name="theme"
      />
      <CategorySelect
        label="Mode de jeu"
        options={modes}
        color={theme.colors.secondary[600]}
        width={180}
        name="mode"
      />
    </>
  );
}
