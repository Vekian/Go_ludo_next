"use client";
import React, { useEffect, useState } from "react";
import { GameCategory, Option } from "@/interfaces";
import { getCategories } from "@/lib/api/server/category";
import ColorSelect from "@/components/ui/input/ColorSelect";
import { theme } from "@/theme/theme";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CategoryGameSelect({
  type,
  label,
  color,
}: {
  type: "category" | "mode" | "theme" | "gamme";
  label: string;
  color: string;
}) {
  const [categories, setCategories] = useState<GameCategory[] | null>(null);
  const [categorySelected, setCategorySelected] = useState<Option | null>(null);
  const [categoriesSelected, setCategoriesSelected] = useState<Option[]>([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categoriesData: GameCategory[] = await getCategories(type);
    setCategories(categoriesData);
  };

  const handleSelect = (
    event: React.ChangeEvent<unknown>,
    value: Option | null
  ) => {
    setCategorySelected(value);
  };

  const addCategory = () => {
    if (categorySelected) {
      const exists = categoriesSelected.some(
        (cat) => cat.value === categorySelected.value
      );
      if (!exists) {
        setCategoriesSelected((prev) => [...prev, categorySelected]);
      }
    }
  };

  const deleteCategory = (category: Option) => {
    setCategoriesSelected((prev) =>
      prev.filter((cat) => cat.value !== category.value)
    );
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-between w-1/4">
        <div className="w-4/5">
          <ColorSelect
            label={label}
            options={
              categories &&
              categories.map((option) => ({
                label: option.name,
                value: option.id.toString(),
              }))
            }
            onChange={handleSelect}
            value={categorySelected}
            color={color}
          />
        </div>

        <ButtonPrimary
          label=""
          color={color}
          icon={faPlus}
          onClick={addCategory}
        />
      </div>
      <div className="flex gap-x-2">
        {categoriesSelected.map((category) => (
          <div key={category.value} className="flex gap-x-1">
            <div
              className=" px-3 py-1 text-white font-semibold rounded-full"
              style={{ backgroundColor: color }}
            >
              {category.label}
            </div>
            <ButtonPrimary
              label=""
              color={theme.colors.primary[700]}
              icon={faTrash}
              onClick={() => deleteCategory(category)}
            />
            <input type="hidden" name={`categories[]`} value={category.value} />
          </div>
        ))}
      </div>
    </div>
  );
}
