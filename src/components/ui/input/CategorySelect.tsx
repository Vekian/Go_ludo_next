"use client";
// CategorySelect.tsx
import React, { useState } from "react";
import { GameCategory, Option } from "@/interfaces";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ColorSelect from "./ColorSelect";

export default function CategorySelect({
  label,
  options,
  color,
  name,
}: {
  label: string;
  options: GameCategory[] | null;
  color: string | null;
  name: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  const handleSelect = (
    event: React.ChangeEvent<unknown>,
    value: Option | null
  ) => {
    setSelectedValue(value);
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value && value.name) {
      newSearchParams.set(value.name, value.value);
      newSearchParams.delete("page");
    } else {
      newSearchParams.delete(name);
    }

    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  return (
    <ColorSelect
      label={label}
      options={
        options &&
        options.map((option) => ({
          name: name,
          label: option.name,
          value: option.id.toString(),
        }))
      }
      onChange={handleSelect}
      value={selectedValue}
      color={color}
    />
  );
}
