import Review from "@/components/cards/ReviewCard";
import React from "react";
import { Game, GameReview } from "@/interfaces";
import ReviewModal from "./ReviewModal";
import { getReviews } from "@/lib/api/server/review";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/nextAuth";
import ReviewCard from "@/components/cards/ReviewCard";
import ListReviews from "../../../list/ListReviews";

export default async function ReviewsWrapper({
  game,
  reviewsPage,
}: {
  game: Game;
  reviewsPage: string | undefined;
}) {
  const reviewList = await getReviews(
    game.id,
    reviewsPage ? Number(reviewsPage) : 1
  );
  const session = await getServerSession(authOptions);

  if (!reviewList.data) {
    throw new Error("No reviews found");
  }

  const totalReviews = reviewList.data.accountReview?.content
    ? reviewList.data.totalResults + 1
    : reviewList.data.totalResults;

  return (
    <div className="mt-4 px-1 md:px-10">
      <div className="flex items-center justify-center relative mb-5 mt-10 flex-wrap">
        <div className="flex lg:absolute lg:left-0 sm:flex-1 lg:w-auto w-full justify-center gap-x-3">
          <h3>
            {reviewList.data.countRatings} note
            {reviewList.data.countRatings > 1 && "s"}
          </h3>
          <h3>
            {totalReviews} critique
            {totalReviews > 1 && "s"}
          </h3>
        </div>
        {!reviewList.data.accountReview && session && (
          <ReviewModal gameId={game.id} />
        )}
      </div>
      <div className="flex flex-col gap-y-4">
        {reviewList.data.accountReview && (
          <Review review={reviewList.data.accountReview} owner={true} />
        )}
        {reviewList.data.items.map((review: GameReview) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <ListReviews reviewList={reviewList.data} />
    </div>
  );
}
