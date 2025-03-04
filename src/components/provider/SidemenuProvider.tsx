"use client";
import React, { createContext, useContext, useState } from "react";

interface SidemenuContextType {
  isMenuOpen: boolean;
  toggleSidemenu: () => void;
}

const SidemenuContext = createContext<SidemenuContextType | undefined>(
  undefined
);

export const useSidemenu = () => {
  const context = useContext(SidemenuContext);
  if (!context) {
    throw new Error("useSidemenuContext must be used within SidemenuProvider");
  }
  return context;
};

const SidemenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  // Fonction pour ouvrir et fermer le menu
  const toggleSidemenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <SidemenuContext.Provider value={{ isMenuOpen, toggleSidemenu }}>
      {children}
    </SidemenuContext.Provider>
  );
};

// Export par défaut
export default SidemenuProvider;
