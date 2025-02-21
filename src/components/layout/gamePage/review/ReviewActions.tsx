"use client";
import React from "react";
import ReviewModal from "./ReviewModal";
import { GameReview } from "@/interfaces";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { theme } from "@/theme/theme";
import { deleteReview } from "@/lib/api/server/review";

function ReviewActions({ review }: { review: GameReview }) {
  const { showSnackbar } = useSnackbarContext();
  const router = useRouter();
  async function handleDelete() {
    const response = await deleteReview(review.id);
    if (!response.ok) {
      showSnackbar(response.message, "error");
    } else {
      showSnackbar(response.message, "success");
      router.refresh();
    }
  }
  return (
    <div className="flex ">
      <ButtonPrimary
        onClick={handleDelete}
        label="Supprimer"
        color={theme.colors.primary[700]}
        icon={faTrash}
      />
      <ReviewModal review={review} gameId={review.game.id} />
    </div>
  );
}

export default ReviewActions;
