import ButtonSecondary from "@/components/button/ButtonSecondary";
import Review from "@/components/card/Review";
import React from "react";
import { Game, GameReview, ReviewList } from "@/interfaces";
import ReviewModal from "./ReviewModal";
import { getReviews } from "@/lib/api/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function ReviewsList({ game }: { game: Game }) {
  const session = await getServerSession(authOptions);
  const reviewList: ReviewList = await getReviews(game.id, session?.user.token);

  return (
    <div className="mt-4 pl-10 pr-10">
      <div className="flex items-center justify-center relative">
        <div className="flex absolute left-0">
          <h3>5 avis</h3>
          <h3 className="ml-4">14 commentaires</h3>
        </div>
        <ReviewModal game={game} review={reviewList.accountReview} />
      </div>
      <div className="flex flex-col gap-y-4">
        {reviewList.accountReview && (
          <Review review={reviewList.accountReview} />
        )}
        {reviewList.reviews.map((review: GameReview) => (
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
