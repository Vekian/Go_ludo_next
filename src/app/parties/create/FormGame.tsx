"use client";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import InputAutoComplete from "@/components/ui/input/InputAutoComplete";
import InputMuiText from "@/components/ui/input/InputMuiText";
import SelectClassic from "@/components/ui/input/SelectClassic";
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
  Input,
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
  const [mode, setMode] = useState();
  const [themeCategory, setThemeCategory] = useState();

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
          <DialogContent>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
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
            <div className="flex items-center gap-x-6">
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
                  { label: "Nom", value: "name" },
                  { label: "Plus récent", value: "date" },
                ]}
                onChange={handleChangeSort}
                label="Trier par"
              />
              <div className="w-36">
                <InputAutoComplete
                  color={theme.colors.primary[600]}
                  label="Categorie"
                  options={categories}
                  name="category"
                  setValue={setCategory}
                  value={category}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
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
              Ajouter
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
