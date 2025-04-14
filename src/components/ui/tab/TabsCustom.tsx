"use client";
import { Tabs } from "@mui/material";
import React, { useState } from "react";

const CustomTab = ({
  label,
  classChild,
}: {
  label: React.ReactNode;
  classChild: string;
}) => {
  return (
    <div
      className={`${classChild} w-full flex justify-center`}
      style={{
        userSelect: "none",
      }}
    >
      {label}
    </div>
  );
};
export default function TabsCustom({
  children,
  scrollable = true,
  classChild = "pt-8",
}: {
  children: React.ReactNode[];
  scrollable?: "auto" | boolean;
  classChild?: string;
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
      scrollButtons={scrollable} // Active le scroll si nécessaire
      allowScrollButtonsMobile
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
        <CustomTab key={index} label={child} classChild={classChild} />
      ))}
    </Tabs>
  );
}
