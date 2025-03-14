"use client";
import React, { useState } from "react";
import SelectClassic from "../../input/SelectClassic";
import { theme } from "@/theme/theme";
import { SelectChangeEvent } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortFilter() {
  const [sort, setSort] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (event.target.value) {
      newSearchParams.set("sort", event.target.value);
    } else {
      newSearchParams.delete("sort");
    }

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };
  return (
    <div className="w-32">
      <SelectClassic
        value={sort}
        options={[
          { value: "recent", label: "Plus récent" },
          { value: "old", label: "Plus vieux" },
          { value: "rating", label: "Note" },
          { value: "price", label: "Prix" },
        ]}
        color={theme.colors.primary[900]}
        label="Trier par"
        onChange={handleChange}
      />
    </div>
  );
}
