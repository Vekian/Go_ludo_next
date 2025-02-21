import Image from "next/image";
import React from "react";
import Rating from "@/components/ui/rating/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { GameReview } from "@/interfaces";
import { getImg } from "@/lib/utils";
import ReviewActions from "./ReviewActions";

function Review({
  review,
  owner = false,
}: {
  review: GameReview;
  owner?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg pt-5 pb-5 pl-10 pr-10">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image
            alt="avatar"
            src={getImg(review.account.avatar)}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="ml-8">
            <h3>{review.account.username}</h3>
            <h5>Il y a 6 semaines</h5>
          </div>
          <div className="ml-20">
            <Rating value={review.rating} />
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          {owner && <ReviewActions review={review} />}
          <FontAwesomeIcon icon={faFlag} fontSize={26} />
        </div>
      </div>
      <p className="mt-5">{review.content}</p>
    </div>
  );
}

export default Review;
