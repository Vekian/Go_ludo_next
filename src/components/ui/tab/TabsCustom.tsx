"use client";
import { Tabs } from "@mui/material";
import React, { useRef, useState } from "react";
import CustomTab from "./CustomTab";

export default function TabsCustom({
  children,
  scrollable = false,
  classChild = "pt-8",
}: {
  children: React.ReactNode[];
  scrollable?: "auto" | boolean;
  classChild?: string;
}) {
  const [value, setValue] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleChange = (newValue: number) => {
    setValue(newValue);

    const targetTab = tabRefs.current[newValue];
    const container = tabsRef.current;

    if (targetTab && container) {
      const offsetLeft = targetTab.offsetLeft;
      const tabWidth = targetTab.offsetWidth;
      const containerScrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;

      if (
        offsetLeft < containerScrollLeft ||
        offsetLeft + tabWidth > containerScrollLeft + containerWidth
      ) {
        container.scrollTo({
          left: offsetLeft - containerWidth / 2 + tabWidth / 2,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Tabs
      value={value}
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
            paddingBottom: 2,
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
        <CustomTab
          key={index}
          label={child}
          classChild={classChild}
          ref={(el) => {
            tabRefs.current[index] = el;
          }}
          onClick={() => handleChange(index)}
        />
      ))}
    </Tabs>
  );
}
