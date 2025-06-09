import React from "react";
import ButtonPrimary from "../ui/button/ButtonPrimary";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import ButtonSecondary from "../ui/button/ButtonSecondary";

export default function WarningModal({
  label,
  color,
  onClick,
  icon,
}: {
  label: string;
  color: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon?: IconProp;
}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <ButtonPrimary
        label={label}
        icon={icon}
        color={color}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr ? Vous ne pourrez plus revenir en arrière.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonSecondary
            label="Valider"
            color={color}
            onClick={(e) => {
              handleClose();
              onClick(e);
            }}
          />
          <ButtonPrimary label="Annuler" color={color} onClick={handleClose} />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
