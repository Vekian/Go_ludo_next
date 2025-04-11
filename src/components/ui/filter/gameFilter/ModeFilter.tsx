"use client";
import React, { useEffect, useState } from "react";
import CategorySelect from "../../input/CategorySelect";
import { theme } from "@/theme/theme";
import { GameCategory } from "@/interfaces";
import { getCategories } from "@/lib/api/server/category";

export default function ModeFilter() {
  const [modes, setModes] = useState<GameCategory[] | null>(null);
  useEffect(() => {
    fetchModes();
  }, []);

  const fetchModes = async () => {
    const modesData: GameCategory[] = await getCategories("mode");
    setModes(modesData);
  };
  return (
    <CategorySelect
      label="Mode de jeu"
      options={modes}
      color={theme.colors.secondary[600]}
      name="mode"
    />
  );
}
