import { useSidemenu } from "@/components/provider/SidemenuProvider";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function ListCollection({
  isMobile = false,
}: {
  isMobile?: boolean;
}) {
  const { isMenuOpen, isMobileMenuOpen, toggleMobileMenu } = useSidemenu();
  const { data } = useSession();

  return (
    <List>
      <ListItem key={"Collection"} disablePadding sx={{ display: "block" }}>
        <Link
          href={"/"}
          onClick={() => isMobile && isMobileMenuOpen && toggleMobileMenu()}
        >
          <ListItemButton
            sx={[
              {
                px: 2.5,
                py: 0,
              },
              (isMobile && isMobileMenuOpen) || isMenuOpen
                ? { justifyContent: "initial" }
                : {
                    justifyContent: "center",
                    paddingBottom: 7,
                    paddingTop: 7,
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 20,
                  fontSize: 25,
                  width: 40,
                  justifyContent: "center",
                },
                (isMobile && isMobileMenuOpen) || isMenuOpen
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              <FontAwesomeIcon icon={faDice} className="text-primary-600" />
            </ListItemIcon>
            <ListItemText
              primary="Tous les jeux"
              sx={[
                (isMobile && isMobileMenuOpen) || isMenuOpen
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </Link>
        <Collapse
          in={(isMobile && isMobileMenuOpen) || isMenuOpen}
          timeout={0}
          unmountOnExit
        >
          <List
            component="ul"
            disablePadding
            sx={{
              paddingLeft: 6,
            }}
          >
            {data && data.user.id && (
              <ListItem component="li">
                <Link
                  href={"/users/profil"}
                  onClick={() =>
                    isMobile && isMobileMenuOpen && toggleMobileMenu()
                  }
                >
                  <ListItemButton sx={{ py: 0 }}>
                    <ListItemText primary="Votre collection" />
                  </ListItemButton>
                </Link>
              </ListItem>
            )}

            {data && data.user.roles.includes("ROLE_ADMIN") && (
              <ListItem component="li">
                <Link
                  href={"/games/create"}
                  onClick={() =>
                    isMobile && isMobileMenuOpen && toggleMobileMenu()
                  }
                >
                  <ListItemButton sx={{ py: 0 }}>
                    <ListItemText primary="Ajouter une fiche de jeu" />
                  </ListItemButton>
                </Link>
              </ListItem>
            )}
          </List>
        </Collapse>
      </ListItem>
    </List>
  );
}
