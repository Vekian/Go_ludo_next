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

export default function ListParties({
  isMobile = false,
}: {
  isMobile?: boolean;
}) {
  const { isMenuOpen, isMobileMenuOpen, toggleMobileMenu } = useSidemenu();
  return (
    <List>
      <ListItem key={"Parties"} disablePadding sx={{ display: "block" }}>
        <Link
          href={"/parties"}
          onClick={() => isMobile && isMobileMenuOpen && toggleMobileMenu()}
        >
          <ListItemButton
            sx={[
              {
                minHeight: 48,
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
              <FontAwesomeIcon icon={faUsers} className="text-secondary-900" />
            </ListItemIcon>
            <ListItemText
              primary="Trouver une partie"
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
            <Link
              href={"/parties/create"}
              onClick={() => isMobile && isMobileMenuOpen && toggleMobileMenu()}
            >
              <ListItem component="li">
                <ListItemButton sx={{ py: 0 }}>
                  <ListItemText primary="Créer une partie" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              href={"/parties/joined"}
              onClick={() => isMobile && isMobileMenuOpen && toggleMobileMenu()}
            >
              <ListItem component="li">
                <ListItemButton sx={{ py: 0 }}>
                  <ListItemText primary="Vos parties en cours" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              href={"/parties/closed"}
              onClick={() => isMobile && isMobileMenuOpen && toggleMobileMenu()}
            >
              <ListItem component="li">
                <ListItemButton sx={{ py: 0 }}>
                  <ListItemText primary="Vos parties terminées" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </ListItem>
    </List>
  );
}
