"use client";
// ButtonSelect.tsx
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import dynamic from "next/dynamic";
import { theme } from "../../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Paper } from "@mui/material";
import { GameCategory } from "@/interfaces";
import { useRouter } from "next/navigation";

interface Option {
  name: string;
  label: string;
  value: number;
}

const ButtonSelect = ({
  label,
  options,
  color,
  width,
  name,
}: {
  label: string;
  options: GameCategory[];
  color: string | null;
  width: number;
  name: string;
}) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);
  const optionsSelect = options.map((option) => ({
    name: name,
    label: option.name,
    value: option.id,
  }));

  const partsColor: [string, string] = color?.split("-") as [string, string];
  const tailwindColor =
    theme.colors[partsColor[0] as keyof typeof theme.colors]?.[
      partsColor[1] as unknown as keyof (typeof theme.colors)["neutral"]
    ];

  const white = theme.colors.white;

  const styleLabel = {
    border: "none",
    color: selectedValue ? theme.colors.black : white,
    transform: "",
    fontFamily: "nunito",
    fontWeight: 700,
    fontSize: "16px",
  };

  if (selectedValue) {
    styleLabel.transform = "translate(30%,-100%)";
    styleLabel.fontSize = "0.8rem";
  }
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Ne rend rien tant que ce n'est pas côté client
  }

  const handleSelect = (
    event: React.ChangeEvent<unknown>,
    value: Option | null
  ) => {
    setSelectedValue(value);
    if (value) {
      router.replace(`/?${value.name}=${value.value}`);
    }
  };

  return (
    <Autocomplete
      popupIcon={
        <FontAwesomeIcon
          icon={faAngleDown}
          style={{ color: white }} // Couleur personnalisable
        />
      }
      disablePortal
      options={optionsSelect}
      value={selectedValue} // Liaison avec la valeur sélectionnée
      onChange={handleSelect}
      PaperComponent={({ children }) => (
        <Paper style={{ fontFamily: "nunito", fontWeight: 700 }}>
          {children}
        </Paper>
      )}
      sx={{
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "10px",
        width: width,
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
          backgroundColor: tailwindColor, // Appliquer la couleur de fond personnalisée pour la liste des options
        },
        ".MuiOutlinedInput-root": {
          borderRadius: "50px",
          fontFamily: "nunito",
          fontWeight: 700,
          backgroundColor: tailwindColor,
          // Applique un border-radius au champ de texte à l'intérieur de l'Autocomplete
        },
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} size="small" />
      )}
    />
  );
};

// Dynamic import with SSR disabled
export default dynamic(() => Promise.resolve(ButtonSelect), { ssr: false });
