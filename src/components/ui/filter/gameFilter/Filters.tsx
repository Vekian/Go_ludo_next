import CategorySelect from "../../input/CategorySelect";
import { theme } from "@/theme/theme";
import React from "react";
import CategoryFilters from "./CategoryFilters";

export default function Filters() {
  return (
    <div className="flex justify-around flex-wrap mt-5">
      <CategorySelect
        label="Trier par"
        options={[
          { id: 2, name: "test1", icon: "" },
          { id: 3, name: "test2", icon: "" },
        ]}
        color={theme.colors.primary[900]}
        width={150}
        name="sort"
      />
      <CategoryFilters />
      <CategorySelect
        label="Durée"
        options={[
          { id: 2, name: "test1", icon: "" },
          { id: 3, name: "test2", icon: "" },
        ]}
        color={theme.colors.primary[500]}
        width={150}
        name="duration"
      />
    </div>
  );
}
