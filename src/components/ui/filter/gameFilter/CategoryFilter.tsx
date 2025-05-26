"use client";
import React, { useEffect, useState } from "react";
import CategorySelect from "../../input/CategorySelect";
import { GameCategory } from "@/interfaces";
import { getCategories } from "@/lib/api/server/category";
import { theme } from "@/theme/theme";

export default function CategoryFilter() {
  const [categories, setCategories] = useState<GameCategory[] | null>(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categoriesData = await getCategories("category");
    if (categoriesData.data) {
      setCategories(categoriesData.data);
    }
  };

  return (
    <CategorySelect
      label="Catégorie"
      options={categories}
      color={theme.colors.primary[500]}
      name="category"
    />
  );
}
