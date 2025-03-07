import React from "react";
import CategorySelect from "../../input/CategorySelect";
import { theme } from "@/theme/theme";
import { GameCategory } from "@/interfaces";
import { getCategories } from "@/lib/api/server/category";

export default async function ModeFilter() {
  const modes: GameCategory[] = await getCategories("mode");
  return (
    <CategorySelect
      label="Mode de jeu"
      options={modes}
      color={theme.colors.secondary[600]}
      name="mode"
    />
  );
}
