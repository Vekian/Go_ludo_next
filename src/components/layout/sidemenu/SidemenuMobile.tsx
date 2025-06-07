import { Divider, Drawer } from "@mui/material";
import React from "react";
import ListCollection from "./ListCollection";
import ListParties from "./ListParties";
import ListAssistance from "./ListAssistance";
import { useSidemenu } from "@/components/provider/SidemenuProvider";

export default function SidemenuMobile() {
  const { isMobileMenuOpen, toggleMobileMenu } = useSidemenu();
  return (
    <Drawer
      open={isMobileMenuOpen}
      onClose={toggleMobileMenu}
      sx={{}}
      className="block lg:hidden"
    >
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
