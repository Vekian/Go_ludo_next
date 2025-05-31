import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { GameReview } from "@/interfaces";
import { getImg } from "@/lib/utils";
import ReviewActions from "./actions/ReviewActions";
import { Avatar } from "@mui/material";
import ReviewRating from "../layout/gamePage/review/ReviewRating";
import ReviewComments from "../layout/gamePage/review/ReviewComments";
import { getDateFormated } from "@/lib/date";
import SimpleSlider from "../ui/slider/SimpleSlider";

export default function ReviewCard({
  review,
  owner = false,
}: {
  review: GameReview;
  owner?: boolean;
}) {
  return (
    <div>
      <div className="bg-white rounded-lg py-5 px-5 md:px-10">
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
              <h5>{getDateFormated(review.createdAt, review.updatedAt)}</h5>
            </div>
            <div className="md:ml-20 ml-5">
              <ReviewRating owner={owner} review={review} />
            </div>
          </div>
          <div className="flex items-center gap-x-4 justify-end w-full sm:justify-center sm:w-auto md:mb-0 -mb-5">
            {owner && <ReviewActions review={review} />}
            <FontAwesomeIcon icon={faFlag} fontSize={26} />
          </div>
        </div>
        <p className="mt-5">{review.content}</p>
        <div className="flex justify-start">
          <div className="flex gap-x-12 flex-wrap md:w-1/2 w-full">
            {review.rulesDifficulty && (
              <div className="flex-1">
                <p className="text-primary-950 font-semibold">
                  Complexité des règles
                </p>
                <SimpleSlider value={review.rulesDifficulty} />
                <div className="flex justify-between -mt-2 ">
                  <small className="text-secondary-600">simple</small>
                  <small className="text-primary-600">complexe</small>
                </div>
              </div>
            )}
            {review.setupTime && (
              <div className="flex-1 flex flex-col ">
                <p className="text-primary-950 font-semibold">
                  Temps de mise en place
                </p>
                <SimpleSlider value={review.setupTime} />
                <div className="flex justify-between -mt-2 ">
                  <small className="text-secondary-600">rapide</small>
                  <small className="text-primary-600">longue</small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ReviewComments review={review} />
    </div>
  );
}
