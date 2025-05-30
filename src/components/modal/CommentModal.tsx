"use client";
import { GameReview, ReviewComment } from "@/interfaces";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import ButtonPrimary from "../ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import CustomCircularLoader from "../ui/loader/CustomCircularLoader";
import ButtonSecondary from "../ui/button/ButtonSecondary";
import { useRouter } from "next/navigation";
import { faCommentDots, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  addReviewComment,
  updateReviewComment,
} from "@/lib/api/server/reviewComment";
import { useSnackbarContext } from "../provider/SnackbarProvider";
import FormError from "../ui/error/FormError";

export default function CommentModal({
  review,
  comment,
}: {
  review: GameReview;
  comment?: ReviewComment;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>();
  const { showSnackbar } = useSnackbarContext();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;

    const formData = new FormData(form);

    let response = null;
    if (!comment) {
      response = await addReviewComment(formData);
    } else {
      response = await updateReviewComment(formData, comment.id);
    }

    if (!response.ok) {
      if (response.errors) {
        setErrors(response.errors);
      }
      showSnackbar(response.message, "error");
    } else {
      showSnackbar(response.message, "success");
      handleClose();
      setLoading(false);
      router.refresh();
    }
    setLoading(false);
  };
  return (
    <React.Fragment>
      <ButtonPrimary
        icon={comment ? faPen : faCommentDots}
        label={`${comment ? "" : "Commenter"}`}
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
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Écrire un commentaire</DialogTitle>
        {loading ? (
          <div className="flex w-full justify-center items-center min-h-52">
            <CustomCircularLoader />
          </div>
        ) : (
          <DialogContent className="px-16 flex flex-col items-center gap-y-3">
            <div className="pt-3 w-full">
              <textarea
                name="content"
                id="content"
                className="bg-neutral-50 rounded-md px-3 py-1 w-full"
                rows={5}
                defaultValue={comment?.content}
              />
              {errors?.content && (
                <FormError errors={errors.content} name="content" />
              )}
              <input type="hidden" name="review" value={review.id} />
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
              label="Valider"
              type="submit"
              color={theme.colors.primary[500]}
            />
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
}
