import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import Review from "@/components/layout/gamePage/review/Review";
import React from "react";
import { Game, GameReview, ReviewList } from "@/interfaces";
import ReviewModal from "./ReviewModal";
import { getReviews } from "@/lib/api/api";

async function ReviewsList({ game }: { game: Game }) {
  const reviewList: ReviewList = await getReviews(game.id);

  return (
    <div className="mt-4 pl-10 pr-10">
      <div className="flex items-center justify-center relative mb-5 mt-10">
        <div className="flex absolute left-0">
          <h3>{reviewList.totalResults} avis</h3>
        </div>
        {!reviewList.accountReview && (
          <ReviewModal gameId={game.id} review={reviewList.accountReview} />
        )}
      </div>
      <div className="flex flex-col gap-y-4">
        {reviewList.accountReview && (
          <Review review={reviewList.accountReview} owner={true} />
        )}
        {reviewList.items.map((review: GameReview) => (
          <Review key={review.id} review={review} />
        ))}
      </div>

      <div className="flex justify-center p-5">
        <ButtonSecondary
          label="Voir plus de commentaires"
          color="primary-800"
        />
      </div>
    </div>
  );
}

export default ReviewsList;
