import { useSidemenu } from "@/components/provider/SidemenuProvider";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
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

export default function ListParties() {
  const { isMenuOpen, toggleSidemenu } = useSidemenu();
  return (
    <List>
      <ListItem key={"Parties"} disablePadding sx={{ display: "block" }}>
        <Link href={"/parties"} onClick={toggleSidemenu}>
          <ListItemButton
            sx={[
              {
                minHeight: 48,
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
              <FontAwesomeIcon icon={faUsers} className="text-secondary-900" />
            </ListItemIcon>
            <ListItemText
              primary="Parties"
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
                <ListItemText primary="Trouver une partie" />
              </ListItemButton>
            </ListItem>
            <ListItem component="li">
              <ListItemButton sx={{ py: 0 }}>
                <ListItemText primary="Vos parties en cours" />
              </ListItemButton>
            </ListItem>
            <ListItem component="li">
              <ListItemButton sx={{ py: 0 }}>
                <ListItemText primary="Vos parties terminées" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </ListItem>
    </List>
  );
}
