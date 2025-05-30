"use client";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import Rating from "@/components/ui/rating/Rating";
import { GameReview } from "@/interfaces";
import { updateReview } from "@/lib/api/server/review";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ReviewRating({
  review,
  owner = false,
}: {
  review: GameReview;
  owner?: boolean;
}) {
  const { showSnackbar } = useSnackbarContext();
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(review.rating);
  const sendOnlyRating = async (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value) {
      setRating(value);
      const formData = new FormData();
      formData.set("rating", String(value ?? ""));
      formData.set("game", String(review.game.id));
      sendReview(formData);
    }
  };
  console.log(review);

  const sendReview = async (formData: FormData) => {
    showSnackbar("Avis en cours de modfication", "info");
    const response = await updateReview(formData, review.id);
    if (!response.ok) {
      showSnackbar("Impossible de modifier l'avis au jeu: ", "error");
    } else {
      showSnackbar("Avis modifié", "success");
      router.refresh();
    }
  };
  return <Rating value={rating} readOnly={!owner} onChange={sendOnlyRating} />;
}
