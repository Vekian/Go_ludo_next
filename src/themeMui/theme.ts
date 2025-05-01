// theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  // Palette des couleurs
  palette: {
    primary: {
      main: "rgba(252, 137, 4, 1)",
      light: "rgba(255, 228, 197, 1)",
      dark: "rgba(206, 76, 3, 1)",
      contrastText: "#fff",
    },
    secondary: {
      main: "rgba(13, 176, 166, 1)",
      light: "rgba(202, 253, 244, 1)",
      dark: "rgba(11, 122, 118, 1)",
      contrastText: "#fff",
    },
    background: {
      default: "rgba(245, 244, 241, 1)", // Couleur de fond par défaut
      paper: "rgba(255, 255, 255, 1)", // Couleur de fond des composants comme Paper
    },
    text: {
      primary: "rgba(17, 17, 17, 1)", // Texte principal
      secondary: "rgba(75, 61, 56, 1)", // Texte secondaire
      disabled: "rgba(159, 140, 112, 1)", // Texte désactivé
    },
  },

  // Typographie
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
    h1: {
      fontFamily: "Farro, serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Farro, serif",
      fontWeight: 700,
    },
    body1: {
      fontFamily: "Nunito, sans-serif",
    },
    body2: {
      fontFamily: "Nunito, sans-serif",
    },
    button: {
      textTransform: "none", // Empêche la mise en majuscules automatique
    },
  },

  // Bordure (radius)
  shape: {
    borderRadius: 10, // Valeur moyenne entre tes tailles
  },

  // Ecrans (breakpoints)
  breakpoints: {
    values: {
      xs: 380, // Adapté pour les petits écrans
      sm: 600, // Tablettes et petits écrans
      md: 900, // Petites desktops
      lg: 1200, // Desktops larges
      xl: 1536, // Très grands écrans
    },
  },

  // Autres configurations personnalisées
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px", // Utilisation de la bordure du thème
          textTransform: "none", // Empêcher la transformation en majuscules
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px -1px 10px rgba(0, 0, 0, 0.25)", // Ombre de carte
        },
      },
    },
    // Ajouter des personnalisations pour d'autres composants si nécessaire
  },
});
