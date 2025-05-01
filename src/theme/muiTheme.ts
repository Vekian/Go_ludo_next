"use client";
import { createTheme } from "@mui/material/styles";
import { theme as appTheme } from "./theme"; // <-- ton objet JS que t'as posté

// TypeScript : étendre la palette MUI pour accepter customColors
declare module "@mui/material/styles" {
  interface Theme {
    customColors: typeof appTheme.colors;
  }
  interface ThemeOptions {
    customColors?: typeof appTheme.colors;
  }
}

export const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: appTheme.colors.primary.main,
      light: appTheme.colors.primary[300],
      dark: appTheme.colors.primary[700],
      contrastText: appTheme.colors.white,
    },
    secondary: {
      main: appTheme.colors.secondary.main,
      light: appTheme.colors.secondary[300],
      dark: appTheme.colors.secondary[700],
      contrastText: appTheme.colors.white,
    },
    background: {
      default: appTheme.colors.neutral[50],
      paper: appTheme.colors.white,
    },
    text: {
      primary: appTheme.colors.black,
      secondary: appTheme.colors.neutral[600],
    },
  },
  shape: {
    borderRadius: 10, // ou appTheme.borderRadius.md si tu veux lier ça aussi
  },
  typography: {
    fontFamily: "var(--font-nunito)",
  },
  customColors: appTheme.colors, // ← ici on passe tout le nuancier
});
