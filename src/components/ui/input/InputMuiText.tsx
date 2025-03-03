import { theme } from "@/theme/theme";
import { styled, TextField } from "@mui/material";

const CustomInput = styled(TextField)({
  "& .MuiFilledInput-root": {
    backgroundColor: theme.colors.primary[50], // Couleur de fond
    borderRadius: 50, // Rayon des bords
    "&:before, &:after": {
      border: "none", // Enlève les bordures avant et après
    },
    "&:hover": {
      backgroundColor: theme.colors.primary[100], // Couleur de fond au survol
      "&:before, &:after": {
        border: "none", // Enlève la bordure lors du focus
      },
    },
    "& input": {
      paddingTop: "10px", // Réduit tout padding excessif en haut
      paddingBottom: "10px", // Réduit tout padding excessif en bas
    },
  },
});
export default CustomInput;
