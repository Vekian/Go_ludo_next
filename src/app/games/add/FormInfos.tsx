"use client";
import InputText from "@/components/ui/input/InputText";
import RangeThumb from "@/components/ui/input/range/RangeThumb";
import SelectClassic from "@/components/ui/input/SelectClassic";
import TextAreaAutosize from "@/components/ui/input/TextAreaAutosize";
import DoubleSlider from "@/components/ui/slider/DoubleSlider";
import { theme } from "@/theme/theme";
import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import CategoryGameSelect from "./CategoryGameSelect";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { addGame } from "@/lib/api/server/game";

export default function FormInfos() {
  const [language, setLanguage] = useState<string>("french");
  const [type, setType] = useState<"base" | "extension">("base");

  const createGame = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const durations = formData.getAll("duration");
    const ages = formData.getAll("age");
    const players = formData.getAll("players");
    formData.set("playtimeMin", durations[0]);
    formData.set("playtimeMax", durations[1]);
    formData.set("playersMin", players[0]);
    formData.set("playersMax", players[1]);
    formData.set("ageMin", ages[0]);
    formData.set("ageMax", ages[1]);
    formData.delete("durations");
    formData.delete("players");
    formData.delete("age");
    const response = await addGame(formData);

    if (response.errors) {
      console.log(response.errors);
    } else {
    }
  };
  return (
    <div className="flex flex-col gap-y-6">
      <form
        method="POST"
        className="w-full flex flex-col gap-y-6"
        onSubmit={createGame}
      >
        <div className="flex flex-col bg-white rounded-lg flex-wrap p-10  gap-y-6">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-primary-950 font-semibold">
                Nom du jeu
              </label>
              <InputText id="name" required={true} />
            </div>
            <div className="flex flex-col justify-start">
              <label className="text-primary-950 font-semibold">Langue</label>
              <SelectClassic
                value={language}
                color={theme.colors.primary[800]}
                options={[
                  { label: "Français", value: "french" },
                  { label: "Anglais", value: "english" },
                  { label: "Allemand", value: "german" },
                  { label: "Italien", value: "italian" },
                  { label: "Espagnol", value: "spanish" },
                ]}
                onChange={(event: SelectChangeEvent<string>) => {
                  setLanguage(event.target.value);
                }}
              />
            </div>
            <div className="flex flex-col justify-start">
              <label className="text-primary-950 font-semibold">
                Type de jeu
              </label>
              <SelectClassic
                value={type}
                color={theme.colors.primary[800]}
                options={[
                  { label: "Jeu", value: "base" },
                  { label: "Extension", value: "extension" },
                ]}
                onChange={(event: SelectChangeEvent<string>) => {
                  if (
                    event.target.value === "base" ||
                    event.target.value === "extension"
                  ) {
                    setType(event.target.value);
                  }
                }}
              />
            </div>
          </div>
          <div className="w-full flex  flex-col">
            <label className="text-primary-950 font-semibold">
              Description:
            </label>
            <TextAreaAutosize name="description" />
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-col w-1/4">
              <label
                htmlFor="duration"
                className="text-primary-950 font-semibold"
              >
                Durée (en minutes):
              </label>
              <DoubleSlider
                max={300}
                min={5}
                defaultValue={[5, 30]}
                valueLabelDisplay="auto"
                name="duration"
                slots={{
                  thumb: RangeThumb,
                }}
              />
            </div>
            <div className="flex flex-col w-1/4">
              <label
                htmlFor="players"
                className="text-primary-950 font-semibold"
              >
                Nombre de joueurs:
              </label>
              <DoubleSlider
                max={30}
                min={2}
                defaultValue={[5, 10]}
                valueLabelDisplay="auto"
                name="players"
                slots={{
                  thumb: RangeThumb,
                }}
              />
            </div>
            <div className="flex flex-col w-1/4">
              <label
                htmlFor="players"
                className="text-primary-950 font-semibold"
              >
                Age:
              </label>
              <DoubleSlider
                max={100}
                min={1}
                defaultValue={[4, 100]}
                valueLabelDisplay="auto"
                name="age"
                slots={{
                  thumb: RangeThumb,
                }}
                sx={{
                  "& .MuiSlider-thumb": {
                    backgroundColor: theme.colors.primary[600],
                  },
                  "& .MuiSlider-valueLabel": {
                    backgroundColor: theme.colors.primary[600],
                  },
                  color: theme.colors.primary[600],
                }}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/4 mt-3">
            <CategoryGameSelect
              type="category"
              label="Catégorie"
              color={theme.colors.primary[500]}
            />
          </div>
          <div className="flex flex-col w-1/4">
            <CategoryGameSelect
              type="mode"
              label="Mode de jeu"
              color={theme.colors.secondary[500]}
            />
          </div>
          <div className="flex flex-col w-1/4">
            <CategoryGameSelect
              type="theme"
              label="Thème"
              color={theme.colors.neutral[500]}
            />
          </div>
        </div>
        <div className="text-center">
          <ButtonPrimary
            label="Créer une fiche de jeu"
            color={theme.colors.primary[500]}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
