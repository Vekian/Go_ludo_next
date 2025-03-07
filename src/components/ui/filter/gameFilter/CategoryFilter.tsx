import React from "react";
import CategorySelect from "../../input/CategorySelect";
import { GameCategory } from "@/interfaces";
import { getCategories } from "@/lib/api/server/category";
import { theme } from "@/theme/theme";

export default async function CategoryFilter() {
  const categories: GameCategory[] = await getCategories("category");
  return (
    <CategorySelect
      label="Catégorie"
      options={categories}
      color={theme.colors.primary[500]}
      name="category"
    />
  );
}
