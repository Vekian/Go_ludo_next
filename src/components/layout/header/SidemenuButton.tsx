"use client";
import { useSidemenu } from "@/components/provider/SidemenuProvider";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import React from "react";

export default function SidemenuButton() {
  const { toggleSidemenu, toggleMobileMenu } = useSidemenu();
  const handleDrawerOpen = () => {
    toggleSidemenu();
    toggleMobileMenu();
  };
  return (
    <div>
      <IconButton
        className="text-black"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={[
          {
            marginRight: 5,
          },
        ]}
      >
        <FontAwesomeIcon icon={faBars} />
      </IconButton>
    </div>
  );
}
