"use client";
import { GameCategory, Option } from "@/interfaces";
import { theme } from "@/theme/theme";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, Paper, TextField } from "@mui/material";
import React from "react";

export default function InputAutoComplete({
  label,
  options,
  color,
  name,
  value,
  setValue,
}: {
  label: string;
  options: GameCategory[];
  color: string | null;
  name: string;
  value: Option | null;
  setValue: (value: Option | null) => void;
}) {
  const optionsSelect = options.map((option) => ({
    name: name,
    label: option.name,
    value: option.id.toString(),
  }));

  const white = theme.colors.white;

  const styleLabel = {
    border: "none",
    color: value ? theme.colors.black : white,
    transform: "",
    fontFamily: "nunito",
    fontWeight: 700,
    fontSize: "16px",
  };

  if (value) {
    styleLabel.transform = "translate(30%,-100%)";
    styleLabel.fontSize = "0.8rem";
  }

  const handleSelect = (
    event: React.ChangeEvent<unknown>,
    value: Option | null
  ) => {
    setValue(value);
  };

  return (
    <Autocomplete
      popupIcon={
        <FontAwesomeIcon
          icon={faAngleDown}
          style={{ color: white }} // Couleur personnalisable
        />
      }
      disablePortal={false}
      options={optionsSelect}
      value={value} // Liaison avec la valeur sélectionnée
      onChange={handleSelect}
      PaperComponent={({ children }) => (
        <Paper style={{ fontFamily: "nunito", fontWeight: 700 }}>
          {children}
        </Paper>
      )}
      sx={{
        textShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)",
        ".MuiInputLabel-root": styleLabel,
        ".MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        ".MuiInputLabel-root.Mui-focused": {
          transform: "translate(30%,-100%)",
          fontSize: "0.8rem",
          color: theme.colors.black,
          textShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)", // Change la couleur du label lorsqu'il est focalisé
        },
        ".MuiAutocomplete-clearIndicator": {
          color: white, // Modifier la couleur de la croix via la classe
        },
        ".MuiAutocomplete-input": {
          marginLeft: "10px",
          marginRight: "10px",
          color: white, // Change la couleur de la valeur sélectionnée
        },
        ".MuiAutocomplete-listbox": {
          backgroundColor: color, // Appliquer la couleur de fond personnalisée pour la liste des options
        },
        ".MuiOutlinedInput-root": {
          borderRadius: "50px",
          fontFamily: "nunito",
          fontWeight: 700,
          backgroundColor: color,
          // Applique un border-radius au champ de texte à l'intérieur de l'Autocomplete
        },
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} size="small" />
      )}
    />
  );
}
