"use client";
import WarningModal from "@/components/modal/WarningModal";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import { Game } from "@/interfaces";
import { deleteGame } from "@/lib/api/server/game";
import { theme } from "@/theme/theme";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonDeleteGame({ game }: { game: Game }) {
  const { showSnackbar } = useSnackbarContext();
  const router = useRouter();
  const handleDelete = async () => {
    const response = await deleteGame(game.id, game.type);
    if (!response.ok) {
      showSnackbar(response.message, "error");
    } else {
      showSnackbar(response.message, "success");
      router.push("/");
    }
  };
  return (
    <WarningModal
      label=""
      color={theme.colors.primary[700]}
      onClick={handleDelete}
      icon={faTrash}
    />
  );
}
