"use client";
import React, { useEffect, useState } from "react";
import CategorySelect from "../../input/CategorySelect";
import { theme } from "@/theme/theme";
import { GameCategory } from "@/interfaces";
import { getCategories } from "@/lib/api/server/category";

export default function ThemeFilter() {
  const [themes, setThemes] = useState<GameCategory[] | null>(null);
  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    const themesData = await getCategories("theme");
    if (themesData.data) {
      setThemes(themesData.data);
    }
  };
  return (
    <CategorySelect
      label="Thème"
      options={themes}
      color={theme.colors.neutral[500]}
      name="theme"
    />
  );
}
