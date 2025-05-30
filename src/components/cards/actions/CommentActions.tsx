import CommentModal from "@/components/modal/CommentModal";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { GameReview, ReviewComment } from "@/interfaces";
import { deleteReviewComment } from "@/lib/api/server/reviewComment";
import { theme } from "@/theme/theme";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import React from "react";

export default function CommentActions({
  comment,
  review,
}: {
  comment: ReviewComment;
  review: GameReview;
}) {
  const { showSnackbar } = useSnackbarContext();
  const router = useRouter();
  async function handleDelete() {
    const response = await deleteReviewComment(comment.id);
    if (!response.ok) {
      showSnackbar(response.message, "error");
    } else {
      showSnackbar(response.message, "success");
      router.refresh();
    }
  }
  return (
    <div className="flex gap-x-3">
      <ButtonPrimary
        onClick={handleDelete}
        label=""
        color={theme.colors.primary[700]}
        icon={faTrash}
      />
      <CommentModal comment={comment} review={review} />
    </div>
  );
}
