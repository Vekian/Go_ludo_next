"use client";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { theme } from "@/theme/theme";

const CustomLinearProgress = styled(LinearProgress)({
  height: 10,
  borderRadius: 25,
  backgroundColor: theme.colors.neutral[300], // Couleur de fond de la barre
  "& .MuiLinearProgress-bar": {
    backgroundColor: theme.colors.primary[900], // Couleur de la barre de progression
  },
});

export default CustomLinearProgress;
