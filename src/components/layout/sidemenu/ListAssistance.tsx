import { useSidemenu } from "@/components/provider/SidemenuProvider";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
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

export default function ListAssistance({
  isMobile = false,
}: {
  isMobile?: boolean;
}) {
  const { isMenuOpen, isMobileMenuOpen, toggleMobileMenu } = useSidemenu();

  return (
    <List>
      <ListItem key={"Accueil"} disablePadding sx={{ display: "block" }}>
        <Link
          href={"/"}
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
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="text-neutral-900"
              />
            </ListItemIcon>
            <ListItemText
              primary="Accueil"
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
          ></List>
        </Collapse>
      </ListItem>
    </List>
  );
}
