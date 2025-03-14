"use client";
import { useSidemenu } from "@/components/provider/SidemenuProvider";
import { CSSObject, Divider, IconButton, styled, Theme } from "@mui/material";
import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import ListCollection from "./ListCollection";
import ListParties from "./ListParties";
import ListAssistance from "./ListAssistance";
import SidemenuMobile from "./SidemenuMobile";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const openedMixin = (theme: Theme): CSSObject => ({
  width: 280,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Sidemenu() {
  const { isMenuOpen, toggleSidemenu } = useSidemenu();
  return (
    <>
      <Drawer
        variant="permanent"
        open={isMenuOpen}
        sx={{}}
        className="hidden lg:block"
      >
        <DrawerHeader>
          <IconButton onClick={toggleSidemenu}></IconButton>
        </DrawerHeader>
        <Divider />
        <ListCollection />
        <Divider />
        <ListParties />
        <Divider />
        <ListAssistance />
      </Drawer>
      <SidemenuMobile />
    </>
  );
}
