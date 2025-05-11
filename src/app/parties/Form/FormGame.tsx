"use client";
import ColorSelect from "@/components/ui/input/ColorSelect";
import InputSearchGlobal from "@/components/ui/input/search/InputSearchGlobal";
import SelectClassic from "@/components/ui/input/SelectClassic";
import Rating from "@/components/ui/rating/Rating";
import { GameCategory, GameListItem, Option } from "@/interfaces";
import { theme } from "@/theme/theme";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function FormGame({
  categories,
  themes,
  modes,
  handleChange,
  formData,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
  handleChange: (name: string, value: string | number | null) => void;
  formData: Record<string, string | null | number>;
}) {
  const [categoryValue, setCategoryValue] = useState<Option | null>(null);
  const [modeValue, setModeValue] = useState<Option | null>(null);
  const [themeValue, setThemeValue] = useState<Option | null>(null);
  const [ratingValue, setRatingValue] = useState<number | null>(null);

  const [game, setGame] = React.useState<GameListItem | null>(null);
  const [inputGame, setInputGame] = React.useState("");

  useEffect(() => {
    if (!formData.category && categoryValue) {
      setCategoryValue(null);
    }
    if (!formData.theme && themeValue) {
      setThemeValue(null);
    }
    if (!formData.mode && modeValue) {
      setModeValue(null);
    }
    if (!formData.rating && ratingValue) {
      setRatingValue(null);
    }
    if (!formData.game) {
      setGame(null);
      setInputGame("");
    }
  }, [formData]);

  function handleGameChange(newGameValue: GameListItem | null) {
    setGame(newGameValue);
    if (newGameValue) {
      handleChange("game", newGameValue.id);
    }
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
    <div className="bg-white gap-y-5 flex flex-col xl:flex-1 w-full flex-wrap p-10 rounded-lg">
      <h2>À quoi veux-tu jouer ?</h2>
      <div>
        <h5 className="font-semibold mb-2">Un jeu particulier ?</h5>
        <div className="2xl:w-2/3 w-full ">
          <InputSearchGlobal
            label="Un jeu, une extension..."
            icon={faDice}
            global={false}
            onChange={handleGameChange}
            value={game}
            valueInput={inputGame}
            onInputChange={setInputGame}
          />
        </div>
      </div>
      <div>
        <h5 className="font-semibold">Ou un type de jeu particulier ?</h5>
        <div className="mt-5 gap-x-5 flex flex-wrap gap-y-3">
          <div className="md:flex-1 w-full">
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
          <div className="md:flex-1 w-full">
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
          <div className="md:flex-1 w-full">
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
      <div className="flex flex-wrap items-end gap-x-10 gap-y-3">
        <div className="md:flex-1">
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
              handleChange("duration", event.target.value);
            }}
            value={formData.duration as string}
          />
        </div>
        <div className="md:flex-1">
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
