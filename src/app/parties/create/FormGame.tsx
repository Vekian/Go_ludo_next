"use client";
import ListPartyGames from "@/components/list/ListPartyGames";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import FormError from "@/components/ui/error/FormError";
import ColorSelect from "@/components/ui/input/ColorSelect";
import InputText from "@/components/ui/input/InputText";
import RangeThumb from "@/components/ui/input/range/RangeThumb";
import SelectClassic from "@/components/ui/input/SelectClassic";
import DoubleSlider from "@/components/ui/slider/DoubleSlider";
import { GameCategory, GameListItem, Option } from "@/interfaces";
import { getGames } from "@/lib/api/server/game";
import { theme } from "@/theme/theme";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
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
  addGame,
  removeGame,
  gamesAdd,
  errors,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
  addGame: (game: GameListItem) => void;
  removeGame: (game: GameListItem) => void;
  gamesAdd: GameListItem[] | null;
  errors: Record<string, string[] | undefined>;
}) {
  const { showSnackbar } = useSnackbarContext();
  const [open, setOpen] = React.useState(false);
  const [typeSearch, setTypeSearch] = useState<string>("all");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState<Option | null>(null);
  const [mode, setMode] = useState<Option | null>(null);
  const [themeCategory, setThemeCategory] = useState<Option | null>(null);
  const [players, setPlayers] = useState([2, 30]);
  const [age, setAge] = useState([18, 100]);
  const [name, setName] = useState("");
  const [durationValue, setDurationValue] = useState<string>("0");
  const [games, setGames] = useState<GameListItem[] | null>(null);

  const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(true);
  };
  const handleClose = (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    setOpen(false);
  };
  const handleAddGame = (game: GameListItem) => {
    addGame(game);
    showSnackbar("Jeu ajouté", "success");
  };

  const handleRemoveGame = (game: GameListItem) => {
    removeGame(game);
    showSnackbar("Jeu retiré", "success");
  };
  const handleSubmit = async () => {
    const params = [];
    if (name) {
      params.push({
        key: "search",
        value: name,
      });
    }
    if (category) {
      params.push({
        key: "category[]",
        value: category.value,
      });
    }
    if (themeCategory) {
      params.push({
        key: "theme[]",
        value: themeCategory.value,
      });
    }
    if (mode) {
      params.push({
        key: "mode[]",
        value: mode.value,
      });
    }
    if (typeSearch) {
      params.push({
        key: "type",
        value: typeSearch,
      });
    }
    const data = await getGames(params);
    if (data.data) {
      setGames(data.data.items);
    }
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
    <div className="w-full flex flex-col gap-y-3">
      <div className="bg-white  flex-wrap rounded-lg px-6 lg:px-12 xl:px-36 py-6 w-full flex gap-x-10 gap-y-3 items-center">
        <h3>Choisir un ou plusieurs jeux</h3>
        <Dialog
          open={open}
          fullWidth
          keepMounted
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
                <MenuItem value={"all"}>Tout</MenuItem>
                <MenuItem value={"collection"}>Dans ma collection</MenuItem>
              </Select>
            </FormControl>
            <div className="flex items-center gap-x-6 justify-between">
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputText
                  type="text"
                  id="name"
                  onChange={(value) => value && setName(value)}
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
                  valueLabelDisplay="auto"
                  value={players}
                  onChange={handlePlayers}
                  slots={{
                    thumb: RangeThumb,
                  }}
                />
              </div>
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
            <div className="flex items-center justify-center gap-x-3">
              <ButtonSecondary
                onClick={handleClose}
                label="Annuler"
                color={theme.colors.primary[800]}
              />
              <ButtonPrimary
                label="Rechercher"
                color={theme.colors.primary[600]}
                onClick={handleSubmit}
              />
            </div>
            {games && games.length > 0 && (
              <div>
                <ListPartyGames
                  games={games}
                  addGame={handleAddGame}
                  removeGame={handleRemoveGame}
                  gamesAdd={gamesAdd}
                  added={false}
                />
              </div>
            )}
            {games && games.length === 0 && (
              <p>Aucun jeu ne correspond à votre recherche</p>
            )}
          </DialogContent>
          <DialogActions className="flex justify-center pb-6">
            <ButtonPrimary
              onClick={handleClose}
              label="Fermer"
              color={theme.colors.primary[900]}
            />
          </DialogActions>
        </Dialog>
        <div className="sm:w-auto w-full text-center">
          <ButtonPrimary
            label="Ajouter un jeu"
            color={theme.colors.primary[600]}
            onClick={handleClickOpen}
            icon={faPlus}
            addClass="min-w-44"
          />
        </div>
        {errors?.games && <FormError name="games" errors={errors.games} />}
      </div>
      <div>
        {gamesAdd && gamesAdd.length > 0 && (
          <ListPartyGames
            games={gamesAdd}
            removeGame={handleRemoveGame}
            addGame={handleAddGame}
            gamesAdd={games}
            added={true}
          />
        )}
      </div>
    </div>
  );
}
