import ButtonSelect from "@/components/input/ButtonSelect";
import { GameCategory } from "@/interfaces";
import { getCategories } from "@/lib/api/api";
import React from "react";

async function Filters() {
  const categories: GameCategory[] = await getCategories("category");
  const modes: GameCategory[] = await getCategories("mode");
  const themes: GameCategory[] = await getCategories("theme");

  return (
    <div className="flex justify-around flex-wrap mt-5">
      <ButtonSelect
        label="Trier par"
        options={[
          { id: 2, name: "test1", icon: "" },
          { id: 3, name: "test2", icon: "" },
        ]}
        color="primary-900"
        width={150}
        name="sort"
      />
      <ButtonSelect
        label="Catégorie"
        options={categories}
        color="primary-500"
        width={150}
        name="category"
      />
      <ButtonSelect
        label="Thème"
        options={themes}
        color="neutral-500"
        width={150}
        name="theme"
      />
      <ButtonSelect
        label="Mode de jeu"
        options={modes}
        color="secondary-600"
        width={180}
        name="mode"
      />
      <ButtonSelect
        label="Durée"
        options={[
          { id: 2, name: "test1", icon: "" },
          { id: 3, name: "test2", icon: "" },
        ]}
        color="primary-500"
        width={150}
        name="duration"
      />
    </div>
  );
}

export default Filters;
