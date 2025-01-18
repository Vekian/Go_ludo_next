import { Option } from "@/interfaces";
import {
  Box,
  FormControl,
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
}: {
  value: string;
  options: Option[];
  color: string;
  onChange: (event: SelectChangeEvent<string>, child?: React.ReactNode) => void;
}) {
  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            value={value}
            onChange={onChange}
            sx={{
              marginLeft: "10px",
              marginRight: "10px",
              marginTop: "10px",
              textShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)",

              ".MuiOutlinedInput-notchedOutline": {
                border: "none", // Supprime la bordure autour du champ
              },

              ".MuiSelect-select": {
                padding: "5px 16px", // Ajuste le padding du texte à l'intérieur du champ
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
