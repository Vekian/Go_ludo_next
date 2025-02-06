"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import ButtonSecondary from "../../ui/button/ButtonSecondary";
import ButtonPrimary from "../../ui/button/ButtonPrimary";
import Rating from "../../ui/rating/Rating";
import { useSnackbarContext } from "../../provider/SnackbarProvider";
import { GameReview } from "@/interfaces";
import { useRouter } from "next/navigation";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function ReviewModal({
  gameId,
  review,
}: {
  gameId: number;
  review?: GameReview | null;
}) {
  const { showSnackbar } = useSnackbarContext();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [reviewed, setReviewed] = useState(review ? true : false);
  const [rating, setRating] = useState<number | null>(
    review ? review.rating : null
  );
  const handleChange = async (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value) {
      setRating(value);
    }
  };
  const handleSubmit = async (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const body = {
      content: formJson.content,
      game: gameId,
      rating: rating,
    };
    if (!reviewed) {
      showSnackbar("Avis en cours d'ajout", "info");
      const response = await fetch("/api/game/rating", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        showSnackbar("Impossible d'ajouter l'avis au jeu: ", "error");
      } else {
        showSnackbar("Avis ajouté au jeu", "success");
        setReviewed(true);
        setOpen(false);
        router.refresh();
      }
    } else if (review) {
      showSnackbar("Avis en cours de modfication", "info");
      const response = await fetch(`/api/game/rating/${review.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        showSnackbar("Impossible de modifier l'avis au jeu: ", "error");
      } else {
        showSnackbar("Avis modifié", "success");
        setOpen(false);
        router.refresh();
      }
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.SyntheticEvent<Element, Event>) =>
            handleSubmit(event),
        }}
      >
        <DialogTitle className="font-farro">
          {review ? "Modifier votre avis" : "Ajouter un avis"}
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col">
            <div className="flex justify-end">
              <Rating readOnly={false} value={rating} onChange={handleChange} />
            </div>

            <label htmlFor="content" className="text-primary-950 font-semibold">
              Avis:
            </label>
            <textarea
              name="content"
              id="content"
              className="bg-neutral-50 rounded-md px-3 py-1"
              rows={5}
              defaultValue={review?.content}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <ButtonSecondary
            onClick={handleClose}
            label="Annuler"
            color={"primary-800"}
          />
          <Button
            className={`bg-primary-600 hover:brightness-90 text-white rounded-md font-semibold  px-3 py-1.5 m-2.5`}
            type="submit"
            sx={{
              textTransform: "none",
            }}
          >
            Soumettre
          </Button>
        </DialogActions>
      </Dialog>
      <div className="flex items-center">
        <ButtonPrimary
          label={review ? "Éditer" : "Ajouter un avis"}
          color="primary-500"
          onClick={handleClickOpen}
          icon={faPenToSquare}
        />
        <div className="ml-20">
          <Rating onChange={handleChange} readOnly={false} value={rating} />
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
