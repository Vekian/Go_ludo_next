import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { GameReview } from "@/interfaces";
import { getImg } from "@/lib/utils";
import ReviewActions from "./ReviewActions";
import { Avatar } from "@mui/material";
import ReviewRating from "./ReviewRating";
import ReviewComments from "./ReviewComments";

function Review({
  review,
  owner = false,
}: {
  review: GameReview;
  owner?: boolean;
}) {
  return (
    <div>
      <div className="bg-white rounded-lg pt-5 pb-5 pl-10 pr-10">
        <div className="flex flex-wrap justify-between gap-y-3 ">
          <div className="flex flex-wrap items-center gap-y-3 sm:order-first order-last">
            <Avatar
              alt={review.account.username}
              src={getImg(review.account.avatar)}
              sx={{
                width: 50,
                height: 50,
              }}
            />
            <div className="ml-8">
              <h3>{review.account.username}</h3>
              <h5>Il y a 6 semaines</h5>
            </div>
            <div className="md:ml-20 ml-5">
              <ReviewRating owner={owner} review={review} />
            </div>
          </div>
          <div className="flex items-center gap-x-4 justify-end w-full sm:justify-center sm:w-auto ">
            {owner && <ReviewActions review={review} />}
            <FontAwesomeIcon icon={faFlag} fontSize={26} />
          </div>
        </div>
        <p className="mt-5">{review.content}</p>
      </div>
      <ReviewComments review={review} />
    </div>
  );
}

export default Review;
