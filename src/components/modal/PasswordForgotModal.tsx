"use client";
import { sendLinkResetPassword } from "@/lib/api/server/user";
import React, { useState } from "react";
import { useSnackbarContext } from "../provider/SnackbarProvider";
import InputText from "../ui/input/InputText";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CustomCircularLoader from "../ui/loader/CustomCircularLoader";
import ButtonPrimary from "../ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import ButtonSecondary from "../ui/button/ButtonSecondary";

export default function PasswordForgotModal() {
  const { showSnackbar } = useSnackbarContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleResetPassword(event: React.FormEvent) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget as HTMLFormElement;

    const formData = new FormData(form);
    setLoading(true);
    const response = await sendLinkResetPassword(
      formData.get("email") as string
    );
    if (!response.ok) {
      showSnackbar(response.message, "error");
    } else {
      showSnackbar(response.message, "success");
    }
    setLoading(false);
    setOpen(false);
  }
  return (
    <React.Fragment>
      <ButtonSecondary
        label="Mot de passe oublié"
        color={theme.colors.primary[900]}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (e: React.FormEvent) => handleResetPassword(e),
        }}
      >
        <DialogTitle>Mot de passe oublié</DialogTitle>
        {loading ? (
          <div className="flex justify-center">
            <CustomCircularLoader />
          </div>
        ) : (
          <DialogContent>
            <div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-primary-950 font-bold">
                  Email:
                </label>
                <InputText id="email" type="email" />
              </div>
            </div>
          </DialogContent>
        )}

        <DialogActions>
          <ButtonSecondary
            label="Annuler"
            color={theme.colors.primary[900]}
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          />
          <ButtonPrimary
            label="Envoyer par email"
            type="submit"
            color={theme.colors.primary[500]}
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
