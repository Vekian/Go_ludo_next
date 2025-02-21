"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import Rating from "@/components/ui/rating/Rating";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import { GameReview } from "@/interfaces";
import { useRouter } from "next/navigation";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { theme } from "@/theme/theme";
import { addReview, updateReview } from "@/lib/api/server/review";

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
  const [rating, setRating] = useState<number | null>(
    review ? review.rating : null
  );
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

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
    formData.set("rating", String(rating ?? ""));
    formData.set("game", String(gameId));
    if (!review) {
      showSnackbar("Avis en cours d'ajout", "info");
      const response = await addReview(formData);
      if (!response.ok) {
        if (response.errors) {
          setErrors(response.errors);
        }
      } else {
        setOpen(false);
        router.refresh();
      }
      if (response.message) {
        showSnackbar(response.message, response.ok ? "success" : "error");
      }
    } else {
      showSnackbar("Avis en cours de modfication", "info");
      const response = await updateReview(formData, review.id);
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
            <div className="flex flex-col items-end">
              <Rating readOnly={false} value={rating} onChange={handleChange} />
              {errors?.rating && (
                <p className="text-red-500">{errors.rating[0]}</p>
              )}
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
            {errors?.content && (
              <p className="text-red-500">{errors.content[0]}</p>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <ButtonSecondary
            onClick={handleClose}
            label="Annuler"
            color={theme.colors.primary[800]}
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
          color={theme.colors.primary[500]}
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
