"use client";
import React, { useState } from "react";
import SelectClassic from "../../input/SelectClassic";
import { theme } from "@/theme/theme";
import { SelectChangeEvent } from "@mui/material";

export default function SortFilter() {
  const [sort, setSort] = useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
  };
  return (
    <div className="w-32">
      <SelectClassic
        value={sort}
        options={[
          { value: "date", label: "Date" },
          { value: "popularity", label: "Popularité" },
          { value: "price", label: "Prix" },
        ]}
        color={theme.colors.primary[900]}
        label="Trier par"
        onChange={handleChange}
      />
    </div>
  );
}
