"use client";
import React, { useEffect, useState } from "react";
import ColorSelect from "./ColorSelect";
import { theme } from "@/theme/theme";
import { getCreators } from "@/lib/api/server/creator";
import { Creator, Option } from "@/interfaces";

export default function CreatorSelect({
  setCreatorSelected,
  creatorSelected,
}: {
  setCreatorSelected: (creator: Creator | null) => void;
  creatorSelected: Creator | null;
}) {
  const [creators, setCreators] = useState<Creator[] | null>(null);
  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    const creatorsData: Creator[] = await getCreators();
    setCreators(creatorsData);
  };
  const handleSelect = (event: React.SyntheticEvent, value: Option | null) => {
    if (!value) {
      setCreatorSelected(null);
      return;
    }
    if (creators) {
      const id = Number(value.value);
      const creator = creators.find((creator) => creator.id === id);
      if (creator) {
        setCreatorSelected(creator);
      }
    }
  };
  return (
    <ColorSelect
      label="Créateurs"
      options={
        creators &&
        creators.map((creator) => ({
          name: "creator[]",
          label: creator.name,
          value: creator.id.toString(),
        }))
      }
      onChange={handleSelect}
      value={
        creatorSelected && {
          name: "creator[]",
          label: creatorSelected?.name,
          value: creatorSelected?.id.toString(),
        }
      }
      color={theme.colors.secondary[800]}
    />
  );
}
