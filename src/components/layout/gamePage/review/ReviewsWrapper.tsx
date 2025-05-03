import Review from "@/components/layout/gamePage/review/Review";
import React from "react";
import { Game, GameReview, ReviewList } from "@/interfaces";
import ReviewModal from "./ReviewModal";
import { getReviews } from "@/lib/api/server/review";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReviewsPagination from "./ReviewsPagination";

export default async function ReviewsWrapper({
  game,
  reviewsPage,
}: {
  game: Game;
  reviewsPage: string | undefined;
}) {
  const reviewList: ReviewList = await getReviews(
    game.id,
    reviewsPage ? Number(reviewsPage) : 1
  );
  const session = await getServerSession(authOptions);

  return (
    <div className="mt-4 pl-10 pr-10">
      <div className="flex items-center justify-center relative mb-5 mt-10 flex-wrap">
        <div className="flex lg:absolute lg:left-0 sm:flex-1 lg:w-auto w-full justify-center">
          <h3>{reviewList.totalResults} avis</h3>
        </div>
        {!reviewList.accountReview && session && (
          <ReviewModal gameId={game.id} />
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

      <ReviewsPagination reviewList={reviewList} />
    </div>
  );
}
