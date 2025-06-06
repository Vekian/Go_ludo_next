"use client";

import React, { useEffect, useState } from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt: () => Promise<void>;
}

export default function InstallPwaButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // On vérifie que c'est bien notre événement spécifique
      if ((e as BeforeInstallPromptEvent).prompt) {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setIsInstallable(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`L'utilisateur a choisi : ${outcome}`);

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (!isInstallable) {
    return null;
  }

  return (
    <ListItem component="li" onClick={handleInstallClick}>
      <ListItemButton sx={{ py: 0 }}>
        <ListItemText primary="Installer l'application" />
      </ListItemButton>
    </ListItem>
  );
}
