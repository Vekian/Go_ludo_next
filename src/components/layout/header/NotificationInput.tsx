"use client";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Divider, IconButton, MenuItem } from "@mui/material";
import React from "react";
import NotificationsList from "./NotificationsList";

export default function NotificationInput() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="me-12">
      <IconButton
        aria-label="fingerprint"
        color="primary"
        onClick={handleClick}
      >
        <Badge
          color="primary"
          overlap="circular"
          badgeContent={4}
          invisible={false}
        >
          <FontAwesomeIcon
            icon={faBell}
            className="text-primary-950 animate-shake"
            size="lg"
          />
        </Badge>
      </IconButton>
      <NotificationsList
        id="demo-customized-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          More
        </MenuItem>
      </NotificationsList>
    </div>
  );
}
