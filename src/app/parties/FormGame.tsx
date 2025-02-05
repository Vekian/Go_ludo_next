"use client";
import InputAutoComplete from "@/components/input/InputAutoComplete";
import InputSearchGlobal from "@/components/input/search/InputSearchGlobal";
import SelectClassic from "@/components/input/SelectClassic";
import Rating from "@/components/rating/Rating";
import { GameCategory, Option } from "@/interfaces";
import { theme } from "@/theme/theme";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";

export default function FormGame({
  categories,
  themes,
  modes,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
}) {
  const [categoryValue, setCategoryValue] = useState<Option | null>(null);
  const [modeValue, setModeValue] = useState<Option | null>(null);
  const [themeValue, setThemeValue] = useState<Option | null>(null);
  const [durationValue, setDurationValue] = useState<string>("0");
  const [ratingValue, setRatingValue] = useState<number | null>(null);
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
          />
        </div>
      </div>
      <div>
        <h5 className="font-semibold">Ou un type de jeu particulier ?</h5>
        <div className="mt-5 gap-x-5 flex">
          <div className="flex-1">
            <InputAutoComplete
              label="Catégorie"
              color="primary-600"
              name="category"
              value={categoryValue}
              options={categories}
              setValue={setCategoryValue}
            />
          </div>
          <div className="flex-1">
            <InputAutoComplete
              label="Mode de jeu"
              color="secondary-600"
              name="mode"
              value={modeValue}
              options={modes}
              setValue={setModeValue}
            />
          </div>
          <div className="flex-1">
            <InputAutoComplete
              label="Theme"
              color="neutral-600"
              name="category"
              value={themeValue}
              options={themes}
              setValue={setThemeValue}
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
            }}
          />
        </div>
      </div>
    </div>
  );
}
