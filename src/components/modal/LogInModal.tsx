"use client";

import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { signIn } from "next-auth/react";
import { theme } from "@/theme/theme";

function LogInModal() {
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
        label="Se connecter"
        color={theme.colors.primary[600]}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (e: React.FormEvent) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;

            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());

            const result = await signIn("credentials", {
              redirect: false,
              email: formJson.email,
              password: formJson.password,
            });

            if (result?.error) {
            } else {
              handleClose();
            }
          },
        }}
      >
        <DialogTitle>Se connecter</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Adresse email"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit">Se connecter</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default LogInModal;
