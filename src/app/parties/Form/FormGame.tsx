"use client";
import ColorSelect from "@/components/ui/input/ColorSelect";
import InputSearchGlobal from "@/components/ui/input/search/InputSearchGlobal";
import SelectClassic from "@/components/ui/input/SelectClassic";
import Rating from "@/components/ui/rating/Rating";
import { GameCategory, Option } from "@/interfaces";
import { theme } from "@/theme/theme";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";

export default function FormGame({
  categories,
  themes,
  modes,
  handleChange,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
  handleChange: (name: string, value: string | number | null) => void;
}) {
  const [categoryValue, setCategoryValue] = useState<Option | null>(null);
  const [modeValue, setModeValue] = useState<Option | null>(null);
  const [themeValue, setThemeValue] = useState<Option | null>(null);
  const [durationValue, setDurationValue] = useState<string>("0");
  const [ratingValue, setRatingValue] = useState<number | null>(null);

  function handleGameChange(newGameValue: number | null) {
    handleChange("game", newGameValue);
  }

  function handleCategoryValue(
    event: React.ChangeEvent<unknown>,
    newCategoryValue: Option | null
  ) {
    setCategoryValue(newCategoryValue);
    handleChange("category", newCategoryValue ? newCategoryValue.value : null);
  }

  function handleThemeValue(
    event: React.ChangeEvent<unknown>,
    newThemeValue: Option | null
  ) {
    setThemeValue(newThemeValue);
    handleChange("theme", newThemeValue ? newThemeValue.value : null);
  }

  function handleModeValue(
    event: React.ChangeEvent<unknown>,
    newModeValue: Option | null
  ) {
    setModeValue(newModeValue);
    handleChange("mode", newModeValue ? newModeValue.value : null);
  }
  return (
    <div className="bg-white gap-y-5 flex flex-col flex-1 p-10 rounded-lg">
      <h2>À quoi veux-tu jouer ?</h2>
      <div>
        <h5 className="font-semibold mb-2">Un jeu particulier ?</h5>
        <div className="w-2/3">
          <InputSearchGlobal
            label="Un jeu, une extension..."
            icon={faDice}
            global={false}
            onChange={handleGameChange}
          />
        </div>
      </div>
      <div>
        <h5 className="font-semibold">Ou un type de jeu particulier ?</h5>
        <div className="mt-5 gap-x-5 flex">
          <div className="flex-1">
            <ColorSelect
              label="Catégorie"
              color={theme.colors.primary[600]}
              value={categoryValue}
              options={categories.map((category) => ({
                name: "category",
                label: category.name,
                value: category.id.toString(),
              }))}
              onChange={handleCategoryValue}
            />
          </div>
          <div className="flex-1">
            <ColorSelect
              label="Mode de jeu"
              color={theme.colors.secondary[600]}
              value={modeValue}
              options={modes.map((mode) => ({
                name: "mode",
                label: mode.name,
                value: mode.id.toString(),
              }))}
              onChange={handleModeValue}
            />
          </div>
          <div className="flex-1">
            <ColorSelect
              label="Theme"
              color={theme.colors.neutral[600]}
              value={themeValue}
              options={themes.map((theme) => ({
                name: "theme",
                label: theme.name,
                value: theme.id.toString(),
              }))}
              onChange={handleThemeValue}
            />
          </div>
        </div>
      </div>
      <div className="flex items-end gap-x-10">
        <div className="flex-1">
          <h5 className="font-semibold">Durée max</h5>
          <SelectClassic
            color={theme.colors.primary[700]}
            options={[
              { label: "Aucune", value: "0" },
              { label: "30 minutes", value: "30" },
              { label: "1 heure", value: "60" },
              { label: "1 heure 30", value: "90" },
              { label: "2 heures", value: "120" },
              { label: "3 heures", value: "180" },
              { label: "4 heures", value: "240" },
            ]}
            onChange={(event: SelectChangeEvent<string>) => {
              setDurationValue(event.target.value);
              handleChange("duration", event.target.value);
            }}
            value={durationValue}
          />
        </div>
        <div className="flex-1">
          <h5 className="font-semibold">Notes min du jeu</h5>
          <Rating
            value={ratingValue}
            readOnly={false}
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              value: number | null
            ) => {
              setRatingValue(value);
              handleChange("rating", value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
