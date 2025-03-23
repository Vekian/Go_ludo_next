"use client";

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { signIn } from "next-auth/react";
import { theme } from "@/theme/theme";
import { useRouter } from "next/navigation";
import ButtonSecondary from "../ui/button/ButtonSecondary";
import CustomInput from "../ui/input/InputMuiText";
import CustomCircularLoader from "../ui/loader/CustomCircularLoader";

function LogInModal() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
        maxWidth="md"
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            const form = e.currentTarget as HTMLFormElement;

            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());

            const result = await signIn("credentials", {
              redirect: false,
              email: formJson.email,
              password: formJson.password,
            });

            if (result?.error) {
              setLoading(false);
              setError("Les identifiants sont invalides");
            } else {
              handleClose();
              setLoading(false);
              router.refresh();
            }
          },
        }}
      >
        <DialogTitle>Se connecter</DialogTitle>
        {loading ? (
          <div className="flex w-full justify-center items-center min-h-52">
            <CustomCircularLoader />
          </div>
        ) : (
          <DialogContent>
            <CustomInput
              className="mt-3"
              autoFocus
              required
              id="email"
              name="email"
              label="Adresse email"
              type="email"
              fullWidth
            />
            <CustomInput
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Mot de passe"
              type="password"
              fullWidth
            />
            {error && (
              <div className="mt-3 text-red-500 text-xs w-full flex justify-center">
                <span className="text-xl">{error}</span>
              </div>
            )}
          </DialogContent>
        )}

        {!loading && (
          <DialogActions className="p-6">
            <ButtonSecondary
              label="Annuler"
              color={theme.colors.primary[900]}
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            />
            <ButtonPrimary
              label="Se connecter"
              color={theme.colors.primary[500]}
            />
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
}

export default LogInModal;
