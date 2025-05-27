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
import CustomCircularLoader from "../ui/loader/CustomCircularLoader";
import InputText from "../ui/input/InputText";
import PasswordForgotModal from "./PasswordForgotModal";
import GoogleSignInButton from "../ui/button/GoogleSignInButton";

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
        maxWidth="sm"
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
          <DialogContent className="px-16 flex flex-col items-center gap-y-3">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-primary-950 font-bold">
                Email:
              </label>
              <InputText id="email" type="email" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-primary-950 font-bold">
                Mot de passe:
              </label>
              <InputText id="password" type="password" />
            </div>
            {error && (
              <div className="mt-3 text-red-500 text-xs w-full flex justify-center">
                <span className="text-xl">{error}</span>
              </div>
            )}
            <PasswordForgotModal />
            <div>
              <p>Ou</p>
            </div>
            <div>
              <GoogleSignInButton />
            </div>
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
              type="submit"
              color={theme.colors.primary[500]}
            />
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
}

export default LogInModal;
