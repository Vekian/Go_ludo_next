"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { theme } from "@/theme/theme";
import { styled } from "@mui/material";

const PartyDatePicker = styled(DatePicker)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.colors.primary[700], // Couleur de fond
    border: "none", // Supprime la bordure
    color: theme.colors.white, // Couleur du texte
    borderRadius: "50px",
    "&:hover": {
      backgroundColor: theme.colors.primary[600], // Couleur au survol
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none", // Supprime la bordure
    },

    "& input": {
      color: theme.colors.white, // Couleur du texte
      textAlign: "center", // Centrer le texte
    },
    "& .MuiInputAdornment-root": {
      "& .MuiIconButton-root": {
        color: theme.colors.white,
      },
      // Couleur de l'icône du calendrier
    },
  },
});

export default PartyDatePicker;
