import { Option } from "@/interfaces";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { theme } from "@/theme/theme";

function SelectClassic({
  value,
  options,
  onChange,
  color,
  label,
}: {
  value: string;
  options: Option[];
  color: string;
  onChange: (event: SelectChangeEvent<string>, child?: React.ReactNode) => void;
  label?: string;
}) {
  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl>
          {label && (
            <InputLabel
              sx={{
                border: "none",
                color: value ? theme.colors.black : theme.colors.white,
                fontFamily: "Nunito",
                fontWeight: 700,
                fontSize: value ? "0.8rem" : "16px", // Change la taille si value existe
                transform: value
                  ? "translate(30%,-100%)"
                  : "translate(30%,30%)", // Applique la transformation si value existe
                transition: "all 0.3s ease", // Animation fluide lors du changement
                "&.Mui-focused": {
                  color: value ? theme.colors.black : theme.colors.white,
                },
              }}
              id={`selectLabel${value}`}
            >
              {label}
            </InputLabel>
          )}
          <Select
            labelId={`selectLabel${value}`}
            value={value}
            onChange={onChange}
            sx={{
              textShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)",
              ".MuiOutlinedInput-notchedOutline": {
                border: "none", // Supprime la bordure autour du champ
              },

              ".MuiSelect-select": {
                padding: "8px 16px", // Ajuste le padding du texte à l'intérieur du champ
                color: theme.colors.white, // Change la couleur de la valeur sélectionnée
                fontFamily: "nunito",
                fontWeight: 700,
                backgroundColor: color, // Applique une couleur d'arrière-plan personnalisée
                borderRadius: "50px", // Ajoute un arrondi à l'intérieur du champ
                "&:focus": {
                  borderRadius: "50px",
                },
              },

              ".MuiSelect-icon": {
                color: theme.colors.white, // Change la couleur de l'icône de la flèche
              },

              ".MuiMenuItem-root": {
                fontFamily: "nunito",
                fontWeight: 700,
                backgroundColor: color, // Change la couleur d'arrière-plan des options
                "&:hover": {
                  backgroundColor: theme.colors.primary, // Ajoute un effet de survol sur les options
                },
              },
            }}
          >
            {options.map((option: Option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default SelectClassic;
