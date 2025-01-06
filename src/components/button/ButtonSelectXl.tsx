"use client";
// ButtonSelect.tsx
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import dynamic from "next/dynamic";
import { theme } from "../../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faDice,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { InputAdornment, Paper } from "@mui/material";

interface Option {
  value: string;
  label: string;
  id: string;
}

const ButtonSelectXl = ({
  label,
  options,
  icon,
}: {
  label: string;
  options: Option[];
  icon: IconDefinition;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  const styleLabel = {
    border: "none",
    color: theme.colors.neutral[300],
    transform: "",
    fontFamily: "nunito",
    fontWeight: 700,
    fontSize: "17px",
    marginLeft: "40px",
  };

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
  };

  return (
    <Autocomplete
      popupIcon={
        <FontAwesomeIcon
          icon={faAngleDown}
          style={{ color: theme.colors.black }} // Couleur personnalisable
        />
      }
      disablePortal
      options={options}
      value={selectedValue} // Liaison avec la valeur sélectionnée
      onChange={handleSelect}
      slotProps={{
        paper: {
          sx: {
            fontFamily: "nunito",
            fontWeight: 700,
          },
        },
      }}
      sx={{
        marginLeft: "10px",
        marginRight: "10px",
        ".MuiInputLabel-root": styleLabel,
        ".MuiAutocomplete-input": {
          marginLeft: "10px",
          marginRight: "10px", // Change la couleur de la valeur sélectionnée
        },
        ".MuiOutlinedInput-root": {
          borderRadius: "50px",
          fontFamily: "nunito",
          fontWeight: 700,
          // Applique un border-radius au champ de texte à l'intérieur de l'Autocomplete
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon
                    icon={icon}
                    style={{
                      color: theme.colors.primary[900],
                      marginLeft: 12,
                    }}
                  />
                </InputAdornment>
              ),
            },
            inputLabel: {
              shrink: Boolean(
                selectedValue || // Si une valeur est sélectionnée
                  params.inputProps?.value
              ),
              style:
                selectedValue || params.inputProps?.value
                  ? { transform: "translate(-20%,-30%)", fontSize: "0.8rem" }
                  : {},
            },
          }}
        />
      )}
    />
  );
};

// Dynamic import with SSR disabled
export default dynamic(() => Promise.resolve(ButtonSelectXl), { ssr: false });
