import { Option } from "@/interfaces";
import { theme } from "@/theme/theme";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function ColorSelect({
  label,
  options,
  color,
  value,
  onChange,
}: {
  label: string;
  options: Option[] | null;
  color: string | null;
  value: Option | null;
  onChange: (event: React.SyntheticEvent, value: Option | null) => void;
}) {
  const styleLabel = {
    border: "none",
    color: value ? theme.colors.black : theme.colors.white,
    transform: "",
    fontFamily: "nunito",
    fontWeight: 700,
    fontSize: "16px",
  };

  if (value) {
    styleLabel.transform = "translate(30%,-100%)";
    styleLabel.fontSize = "0.8rem";
  }
  return (
    <Autocomplete
      popupIcon={
        <FontAwesomeIcon
          icon={faAngleDown}
          style={{ color: theme.colors.white }} // Couleur personnalisable
        />
      }
      disablePortal={false}
      options={options ?? []}
      value={value} // Liaison avec la valeur sélectionnée
      onChange={onChange}
      slotProps={{
        paper: {
          sx: { fontFamily: "nunito", fontWeight: 700 },
        },
      }}
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
          color: theme.colors.white, // Modifier la couleur de la croix via la classe
        },
        ".MuiAutocomplete-input": {
          marginLeft: "10px",
          marginRight: "10px",
          color: theme.colors.white, // Change la couleur de la valeur sélectionnée
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
