import React from "react";
import CategorySelect from "../../input/CategorySelect";
import { theme } from "@/theme/theme";
import { GameCategory } from "@/interfaces";
import { getCategories } from "@/lib/api/server/category";

export default async function ThemeFilter() {
  const themes: GameCategory[] = await getCategories("theme");
  return (
    <CategorySelect
      label="Thème"
      options={themes}
      color={theme.colors.neutral[500]}
      width={180}
      name="theme"
    />
  );
}
