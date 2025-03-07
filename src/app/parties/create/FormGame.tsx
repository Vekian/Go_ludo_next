"use client";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import ColorSelect from "@/components/ui/input/ColorSelect";
import InputMuiText from "@/components/ui/input/InputMuiText";
import RangeThumb from "@/components/ui/input/range/RangeThumb";
import SelectClassic from "@/components/ui/input/SelectClassic";
import DoubleSlider from "@/components/ui/slider/DoubleSlider";
import { GameCategory, GameListItem, Option } from "@/interfaces";
import { theme } from "@/theme/theme";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
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
  const [games, setGames] = useState<GameListItem[]>();
  const [open, setOpen] = React.useState(false);
  const [typeSearch, setTypeSearch] = useState<string>("global");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState<Option | null>(null);
  const [mode, setMode] = useState<Option | null>(null);
  const [themeCategory, setThemeCategory] = useState<Option | null>(null);
  const [players, setPlayers] = useState([2, 30]);
  const [age, setAge] = useState([18, 100]);
  const [durationValue, setDurationValue] = useState<string>("0");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChangeTypeSearch = (event: SelectChangeEvent) => {
    setTypeSearch(event.target.value);
  };

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  const handleCategory = (
    event: React.ChangeEvent<unknown>,
    value: Option | null
  ) => {
    setCategory(value);
  };

  const handleMode = (
    event: React.ChangeEvent<unknown>,
    value: Option | null
  ) => {
    setMode(value);
  };
  const handleTheme = (
    event: React.ChangeEvent<unknown>,
    value: Option | null
  ) => {
    setThemeCategory(value);
  };

  const handlePlayers = (event: Event, newRangeValue: number | number[]) => {
    if (Array.isArray(newRangeValue)) {
      setPlayers(newRangeValue as number[]);
    }
  };

  const handleAge = (event: Event, newRangeValue: number | number[]) => {
    if (Array.isArray(newRangeValue)) {
      setAge(newRangeValue as number[]);
    }
  };
  return (
    <div className="w-full flex flex-col gap-y-10">
      <div className="bg-white rounded-lg px-36 py-6 w-full flex gap-x-10 items-center">
        <h3>Choisir un ou plusieurs jeux</h3>
        <Dialog
          open={open}
          fullWidth
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
          maxWidth={"xl"}
        >
          <DialogTitle className="font-farro">Ajouter un jeu</DialogTitle>
          <DialogContent className="flex flex-col gap-y-6 p-16">
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
              <InputLabel
                id="typeSearchLabel"
                sx={{
                  color: "black", // Couleur par défaut du label
                  "&.Mui-focused": {
                    color: theme.colors.primary[900], // Couleur du label quand il est focus
                  },
                }}
              >
                Rechercher
              </InputLabel>
              <Select
                labelId="typeSearchLabel"
                id="typeSearch"
                value={typeSearch}
                label="Rechercher"
                onChange={handleChangeTypeSearch}
                size="small"
                sx={{
                  borderRadius: "25px", // Arrondir les coins
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black", // Changer la couleur de la bordure par défaut
                    borderRadius: "25px", // Assurer l'arrondi sur l'outline
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black", // Bordure noire au hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.colors.primary[900],
                  },
                }}
              >
                <MenuItem value={"global"}>Tout</MenuItem>
                <MenuItem value={"collection"}>Dans ma collection</MenuItem>
              </Select>
            </FormControl>
            <div className="flex items-center gap-x-6 justify-between">
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputMuiText
                  type="text"
                  variant="filled"
                  size="small"
                  placeholder="Nom du jeu"
                />
              </FormControl>
              <SelectClassic
                value={sort}
                color={theme.colors.primary[900]}
                options={[
                  { label: "Aucun", value: "none" },
                  { label: "Nom", value: "name" },
                  { label: "Plus récent", value: "date" },
                ]}
                onChange={handleChangeSort}
                label="Trier par"
              />
              <div className="w-36">
                <ColorSelect
                  color={theme.colors.primary[600]}
                  label="Categorie"
                  options={categories.map((category) => ({
                    name: "category",
                    label: category.name,
                    value: category.id.toString(),
                  }))}
                  onChange={handleCategory}
                  value={category}
                />
              </div>
              <div className="w-40">
                <ColorSelect
                  color={theme.colors.secondary[600]}
                  label="Mode de jeu"
                  options={modes.map((mode) => ({
                    name: "mode",
                    label: mode.name,
                    value: mode.id.toString(),
                  }))}
                  onChange={handleMode}
                  value={mode}
                />
              </div>
              <div className="w-44">
                <ColorSelect
                  color={theme.colors.neutral[600]}
                  label="Thème de jeu"
                  options={themes.map((theme) => ({
                    name: "theme",
                    label: theme.name,
                    value: theme.id.toString(),
                  }))}
                  onChange={handleTheme}
                  value={themeCategory}
                />
              </div>
            </div>
            <div className="flex  items-end gap-x-6 justify-between">
              <div className="w-1/4">
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
                  value={players}
                  onChange={handlePlayers}
                  slots={{
                    thumb: RangeThumb,
                  }}
                />
              </div>{" "}
              <div className="w-1/4">
                <label
                  htmlFor="players"
                  className="text-primary-950 font-semibold"
                >
                  Age:
                </label>
                <DoubleSlider
                  max={100}
                  min={18}
                  defaultValue={[18, 100]}
                  valueLabelDisplay="auto"
                  value={age}
                  onChange={handleAge}
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
              <div>
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
                  label="Durée"
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions className="flex justify-center">
            <ButtonSecondary
              onClick={handleClose}
              label="Annuler"
              color={theme.colors.primary[800]}
            />
            <Button
              className={`bg-primary-600 hover:brightness-90 text-white rounded-md font-semibold  px-3 py-1.5 m-2.5`}
              type="submit"
              sx={{
                textTransform: "none",
              }}
            >
              Rechercher
            </Button>
          </DialogActions>
        </Dialog>
        <ButtonPrimary
          label="Ajouter un jeu"
          color={theme.colors.primary[600]}
          onClick={handleClickOpen}
          icon={faPlus}
        />
      </div>
    </div>
  );
}
