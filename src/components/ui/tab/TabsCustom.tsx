"use client";
import { Tabs } from "@mui/material";
import React, { useState } from "react";

const CustomTab = ({ label }: { label: React.ReactNode }) => {
  return (
    <div
      className="pt-6"
      style={{
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {label}
    </div>
  );
};
export default function TabsCustom({
  children,
}: {
  children: React.ReactNode[];
}) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons={false} // Active le scroll si nécessaire
      allowScrollButtonsMobile
      aria-label="Filtres"
      sx={{
        "& .MuiTabs-scroller": {
          overflowX: "auto",
          scrollbarWidth: "none", // Masquer la scrollbar sur Firefox
          "& .MuiTabs-flexContainer": {
            justifyContent: "flex-start", // Aligner les tabs à gauche pour éviter l'effet de centrage forcé
            gap: "16px",
            width: "100%",
            "@media (min-width: 640px)": {
              justifyContent: "space-around",
            },
          },
          "&::-webkit-scrollbar": {
            display: "none", // Masquer la scrollbar sur Chrome/Safari
          },
        },
        "& .MuiTabs-indicator": { display: "none" },
      }}
    >
      {children.map((child, index) => (
        <CustomTab key={index} label={child} />
      ))}
    </Tabs>
  );
}
