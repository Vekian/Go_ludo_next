"use client";
import CommentModal from "@/components/modal/CommentModal";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { GameReview } from "@/interfaces";
import { theme } from "@/theme/theme";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import CommentCard from "@/components/cards/CommentCard";

export default function ReviewComments({ review }: { review: GameReview }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <div className="bg-white rounded-b-lg  pt-5 pb-5 pl-10 pr-10 -mt-6">
        <div className="flex flex-wrap gap-y-3 gap-x-3">
          <ButtonPrimary
            icon={faComments}
            label={`${review.reviewComments.length} commentaire${
              review.reviewComments.length > 1 ? "s" : ""
            }`}
            color={theme.colors.primary[900]}
            onClick={() => setOpen(!open)}
            disabled={review.reviewComments.length > 0 ? false : true}
          />
          <CommentModal review={review} />
        </div>
      </div>
      <div className="flex justify-end w-full">
        <div
          className={`w-11/12 md:w-3/4 flex flex-col gap-y-3 transition-all duration-500 transform ${
            open ? " opacity-100 py-6" : " opacity-0"
          }`}
        >
          {review.reviewComments.length > 0 &&
            open &&
            review.reviewComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} review={review} />
            ))}
        </div>
      </div>
    </div>
  );
}
