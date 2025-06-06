"use client";

import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { theme } from "@/theme/theme";
import ButtonPrimary from "./ButtonPrimary";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt: () => Promise<void>;
}

export default function InstallPwaBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(userAgent));
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    if (shown) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("Choix utilisateur :", outcome);
      setDeferredPrompt(null);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setShown(true);
  };
  if (isStandalone) return null;

  return (
    <>
      {/* Android / Desktop */}
      <Snackbar
        open={shown ? !shown : open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="info"
          sx={{
            width: "100%",
            backgroundColor: theme.colors.primary[950], // vert foncé par exemple
            color: "#fff",
            "& .MuiAlert-message": {
              color: "#fff",
            },
          }}
          action={
            <ButtonPrimary
              label="Installer"
              onClick={handleInstallClick}
              color={theme.colors.primary[600]}
            />
          }
        >
          <span className="font-nunito font-semibold">
            Installez l’application pour un accès plus rapide !
          </span>
        </Alert>
      </Snackbar>

      {/* iOS */}
      {isIos && (
        <Snackbar
          open={shown ? !shown : open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="info"
            sx={{
              width: "100%",
              backgroundColor: theme.colors.primary[950], // vert foncé par exemple
              color: "#fff",
              "& .MuiAlert-message": {
                color: "#fff",
              },
            }}
            onClose={handleClose}
          >
            <span className="font-nunito font-semibold">
              Sur iPhone : menu Partager &rarr; Sur l’écran d’accueil.
            </span>
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
