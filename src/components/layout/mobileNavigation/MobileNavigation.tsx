"use client";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";

export default function MobileNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = React.useState(() => {
    // Permet de définir l'onglet actif en fonction de la route actuelle
    if (pathname === "/") return 0;
    if (pathname === "/parties") return 1;
    if (pathname === "/users/profil") return 2;
    return 0;
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push("/");
        break;
      case 1:
        router.push("/parties");
        break;
      case 2:
        router.push("/users/profil");
        break;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden z-50 bg-white border-t">
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Accueil"
          icon={<FontAwesomeIcon icon={faHouse} size="xl" />}
        />
        <BottomNavigationAction
          label="Parties"
          icon={<FontAwesomeIcon icon={faUsers} size="xl" />}
        />
        <BottomNavigationAction
          label="Collection"
          icon={<FontAwesomeIcon icon={faDice} size="xl" />}
        />
      </BottomNavigation>
    </div>
  );
}
