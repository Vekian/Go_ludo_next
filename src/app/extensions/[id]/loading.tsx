import { theme } from "@/theme/theme";
import { LinearProgress } from "@mui/material";
import React from "react";

export default function loading() {
  return (
    <div className="pt-12 px-6">
      <LinearProgress
        sx={{
          height: 10,
          borderRadius: 25,
          backgroundColor: theme.colors.neutral[300], // Couleur de fond de la barre
          "& .MuiLinearProgress-bar": {
            backgroundColor: theme.colors.primary[900], // Couleur de la barre de progression
          },
        }}
      />
    </div>
  );
}
