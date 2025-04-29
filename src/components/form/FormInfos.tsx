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
import { addGame, updateGame } from "@/lib/api/server/game";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import CustomCircularLoader from "@/components/ui/loader/CustomCircularLoader";
import FormError from "@/components/ui/error/FormError";
import { Game } from "@/interfaces";
import { useRouter } from "next/navigation";

export default function FormInfos({ game }: { game: Game | null }) {
  const [language, setLanguage] = useState<string>(
    game ? game.language : "french"
  );

  const [type, setType] = useState<"base" | "extension">(
    game ? game.type : "base"
  );
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const { showSnackbar } = useSnackbarContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGame = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const durations = formData.getAll("duration");
    const ages = formData.getAll("age");
    const players = formData.getAll("players");
    formData.set("language", language);
    formData.set("playtimeMin", durations[0]);
    formData.set("playtimeMax", durations[1]);
    formData.set("playersMin", players[0]);
    formData.set("playersMax", players[1]);
    formData.set("ageMin", ages[0]);
    formData.set("ageMax", ages[1]);
    formData.delete("durations");
    formData.delete("players");
    formData.delete("age");
    setLoading(true);

    let response = null;
    if (game) {
      response = await updateGame(formData, type, game.id);
    } else {
      response = await addGame(formData, type);
    }

    if (!response.ok) {
      if (response.errors) {
        setErrors(response.errors);
      }

      showSnackbar(response.message, "error");
      setLoading(false);
    } else {
      setErrors(null);
      router.push(
        `/${
          response.data.type === "base" ? "game" : response.data.type
        }s/edit/${response.data.id}/2`
      );
      setLoading(false);
      showSnackbar(response.message, "success");
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      <form
        method="POST"
        className="w-full flex flex-col gap-y-6"
        onSubmit={handleGame}
      >
        <div className="flex flex-col bg-white rounded-lg flex-wrap p-10  gap-y-6">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-primary-950 font-semibold">
                Nom du jeu
              </label>
              <InputText id="name" required={true} defaultValue={game?.name} />
              {errors?.name && <FormError name="name" errors={errors.name} />}
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
              {errors?.language && (
                <FormError name="language" errors={errors.language} />
              )}
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
            <TextAreaAutosize
              name="description"
              defaultValue={game?.description}
            />
            {errors?.description && (
              <FormError name="description" errors={errors.description} />
            )}
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
                defaultValue={[
                  game ? game.playtimeMin : 5,
                  game ? game.playtimeMax : 30,
                ]}
                valueLabelDisplay="auto"
                name="duration"
                slots={{
                  thumb: RangeThumb,
                }}
              />
              {errors?.playtimeMin && (
                <FormError name="playtimeMin" errors={errors.playtimeMin} />
              )}
              {errors?.playtimeMax && (
                <FormError name="playtimeMax" errors={errors.playtimeMax} />
              )}
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
                defaultValue={[
                  game ? game.playersMin : 5,
                  game ? game.playersMax : 10,
                ]}
                valueLabelDisplay="auto"
                name="players"
                slots={{
                  thumb: RangeThumb,
                }}
              />
              {errors?.playersMin && (
                <FormError name="playersMin" errors={errors.playersMin} />
              )}
              {errors?.playersMax && (
                <FormError name="playersMax" errors={errors.playersMax} />
              )}
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
                defaultValue={[
                  game ? game.ageMin : 4,
                  game ? game.ageMax : 100,
                ]}
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
              {errors?.ageMin && (
                <FormError name="ageMin" errors={errors.ageMin} />
              )}
              {errors?.ageMax && (
                <FormError name="ageMax" errors={errors.ageMax} />
              )}
            </div>
          </div>
          <div className="flex flex-col  mt-3">
            <CategoryGameSelect
              type="category"
              label="Catégorie"
              color={theme.colors.primary[500]}
              gameCategories={game?.categories.categories}
            />
          </div>
          <div className="flex flex-col ">
            <CategoryGameSelect
              type="mode"
              label="Mode de jeu"
              color={theme.colors.secondary[500]}
              gameCategories={game?.categories.modes}
            />
          </div>
          <div className="flex flex-col ">
            <CategoryGameSelect
              type="theme"
              label="Thème"
              color={theme.colors.neutral[500]}
              gameCategories={game?.categories.themes}
            />
            {errors?.categories && (
              <FormError name="categories" errors={errors.categories} />
            )}
          </div>
          {errors?.general && (
            <FormError name="general" errors={errors.general} />
          )}
        </div>
        <div className="text-center">
          {loading ? (
            <CustomCircularLoader />
          ) : (
            <ButtonPrimary
              label={`${game ? "Modifier la" : "Créer une"} fiche de jeu`}
              color={theme.colors.primary[500]}
              type="submit"
            />
          )}
        </div>
      </form>
    </div>
  );
}
