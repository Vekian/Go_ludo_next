"use client";
// CategorySelect.tsx
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { GameCategory } from "@/interfaces";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ColorSelect from "./ColorSelect";

interface Option {
  name?: string;
  label: string;
  value: string;
}

const CategorySelect = ({
  label,
  options,
  color,
  name,
}: {
  label: string;
  options: GameCategory[];
  color: string | null;
  name: string;
}) => {
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
    } else {
      newSearchParams.delete(name);
    }

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <ColorSelect
      label={label}
      options={options.map((option) => ({
        name: name,
        label: option.name,
        value: option.id.toString(),
      }))}
      onChange={handleSelect}
      value={selectedValue}
      color={color}
    />
  );
};

// Dynamic import with SSR disabled
export default dynamic(() => Promise.resolve(CategorySelect), { ssr: false });
