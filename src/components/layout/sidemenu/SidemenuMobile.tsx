import { Divider, Drawer } from "@mui/material";
import React from "react";
import ListCollection from "./ListCollection";
import ListParties from "./ListParties";
import ListAssistance from "./ListAssistance";

export default function SidemenuMobile({
  isMenuOpen,
}: {
  isMenuOpen: boolean;
}) {
  return (
    <Drawer open={isMenuOpen} sx={{}} className="block md:hidden">
      <div className="mt-14"></div>
      <Divider />
      <ListCollection isMobile={true} />
      <Divider />
      <ListParties isMobile={true} />
      <Divider />
      <ListAssistance isMobile={true} />
    </Drawer>
  );
}
