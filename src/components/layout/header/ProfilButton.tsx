import {
  faAngleDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { theme } from "@/theme/theme";
import { useRouter } from "next/navigation";
import { User } from "next-auth";

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
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={
          <span className="hidden md:block">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        }
        sx={{ textTransform: "none" }}
        className="md:rounded-md rounded-full md:min-w-32 md:w-auto min-w-0 w-0 bg-primary-600   hover:brightness-90 h-10 font-semibold"
      >
        {user.avatar && (
          <div className="w-14 h-14 absolute">
            <Image
              alt="avatar"
              src={`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${user.avatar}`}
              className="md:-ml-16 mr-3 rounded-full"
              fill
            />
          </div>
        )}
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
