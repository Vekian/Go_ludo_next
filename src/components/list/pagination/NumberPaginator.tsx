import { theme } from "@/theme/theme";
import { Pagination, Stack } from "@mui/material";
import React from "react";

export default function NumberPaginator({
  page,
  totalPages,
  handlePagination,
}: {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={(e, newPage) => handlePagination(newPage)}
        sx={{
          // Cibler le champ input dans la pagination
          "& .MuiPaginationItem-root": {
            color: theme.colors.primary[950],
            // Fond transparent pour les items
            backgroundColor: theme.colors.white,
            "&:hover": {
              backgroundColor: theme.colors.neutral[50], // Couleur au survol
            },
            "&.Mui-selected": {
              backgroundColor: theme.colors.neutral[200], // Couleur de fond de la page sélectionnée
            },
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#4caf50", // Couleur de la bordure initiale
            },
            "&:hover fieldset": {
              borderColor: "#ff5722", // Bordure au survol
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2196f3", // Bordure au focus
            },
          },
        }}
      />
    </Stack>
  );
}
