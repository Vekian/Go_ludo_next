import {
  faAngleDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Divider, Menu, MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";
import React from "react";
import { theme } from "@/theme/theme";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import { getImg } from "@/lib/utils";

function ProfilButton({ user }: { user: User }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    signOut();
  };
  return (
    <div>
      <Button
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        disableElevation
        disableRipple
        onClick={handleClick}
        endIcon={
          <span className="hidden md:block">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        }
        sx={{
          textTransform: "none",
          backgroundColor: {
            xs: "transparent",
            md: theme.colors.primary[600],
          },
          color: "white",
          "&:hover": {
            backgroundColor: {
              xs: "transparent",
              md: theme.colors.primary[400],
            },
          },
          "&:focus": {
            backgroundColor: {
              xs: "transparent",
              md: theme.colors.primary[500],
            },
          },
          "&.Mui-focusVisible": {
            backgroundColor: {
              xs: "transparent",
              md: theme.colors.primary[500],
            },
          },
          "&:active": {
            backgroundColor: {
              xs: "transparent",
              md: theme.colors.primary[500],
            },
          },
          padding: "0 8px",
          borderRadius: {
            xs: "9999px",
            md: "8px",
          },
          minWidth: {
            xs: 0,
            md: "8rem",
          },
          height: "40px",
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        <div style={{ marginLeft: "-3rem" }} className="md:-ml-12">
          <Avatar
            alt={user.name}
            src={getImg(user.avatar)}
            sx={{ width: 56, height: 56 }}
          />
        </div>
        <span className="hidden md:block md:ml-6">{user.name}</span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          sx: {
            backgroundColor: theme.colors.primary[50],
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
      >
        <MenuItem
          className="font-semibold"
          onClick={() => {
            router.push(`/users/profil`);
            handleClose();
          }}
        >
          Mon compte
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          className="font-semibold flex items-start"
          onClick={handleSignOut}
        >
          <FontAwesomeIcon className="mr-3 text-xl" icon={faRightFromBracket} />
          <p>Se déconnecter</p>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ProfilButton;
