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
import Link from "next/link";
import React from "react";

export default function ListCollection({
  isMenuOpen,
}: {
  isMenuOpen: boolean;
}) {
  return (
    <List>
      <ListItem key={"Collection"} disablePadding sx={{ display: "block" }}>
        <Link href={"/users/profil"}>
          <ListItemButton
            sx={[
              {
                px: 2.5,
                py: 0,
              },
              isMenuOpen
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
                isMenuOpen
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
              primary="Collection"
              sx={[
                isMenuOpen
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
        <Collapse in={isMenuOpen} timeout={0} unmountOnExit>
          <List
            component="ul"
            disablePadding
            sx={{
              paddingLeft: 6,
            }}
          >
            <ListItem component="li">
              <ListItemButton sx={{ py: 0 }}>
                <ListItemText primary="Tous les jeux" />
              </ListItemButton>
            </ListItem>
            <ListItem component="li">
              <ListItemButton sx={{ py: 0 }}>
                <ListItemText primary="Recherche avancée" />
              </ListItemButton>
            </ListItem>
            <ListItem component="li">
              <ListItemButton sx={{ py: 0 }}>
                <ListItemText primary="Voir votre collection" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </ListItem>
    </List>
  );
}
