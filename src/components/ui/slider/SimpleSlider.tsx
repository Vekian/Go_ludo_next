"use client";
import { Box, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { theme } from "@/theme/theme";

export default function SimpleSlider({
  value,
  onChange,
}: {
  value: number | null;
  onChange?: (value: number) => void;
}) {
  const [color, setColor] = useState<string>("");
  useEffect(() => {
    setColor(calculateColor(value ?? 0));
  }, [value]);
  const firstColor = theme.colors.secondary[500];
  const secondColor = theme.colors.primary[700];

  const rgbaToArray = (rgba: string): number[] => {
    const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) throw new Error("Invalid RGBA format");
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
  };
  const calculateColor = (value: number) => {
    const gradientStart = 0; // Correspond au pourcentage 0% dans le gradient
    const gradientEnd = 75; // Correspond au pourcentage 75% dans le gradient

    const adjustedValue = Math.min(Math.max(value, gradientStart), gradientEnd);
    const ratio =
      (adjustedValue - gradientStart) / (gradientEnd - gradientStart);

    const startColor = rgbaToArray(firstColor);
    const endColor = rgbaToArray(secondColor);

    const interpolatedColor = startColor.map((start, index) =>
      Math.round(start + ratio * (endColor[index] - start))
    );

    // Retourner une couleur sous forme de chaîne rgba(...)
    return `rgba(${interpolatedColor.join(",")}, 1)`;
  };
  return (
    <Box sx={{ width: 150 }}>
      <Slider
        value={value ?? 0}
        disabled={onChange ? false : true}
        onChange={(_, value) => {
          if (onChange) {
            onChange(value as number);
          }
        }}
        sx={{
          // La couleur du slider avec un dégradé
          "& .MuiSlider-track": {
            background: `transparent`,
            height: 8,
          },
          "& .MuiSlider-rail": {
            background: `linear-gradient(90deg, ${firstColor} 0%, ${secondColor} 75% )`,
            height: 8,
            opacity: 1,
          },
          "& .MuiSlider-thumb": {
            background: color,
            width: 8, // Largeur de la barre
            height: 30,
            borderRadius: 1,
          },
        }}
      />
    </Box>
  );
}
