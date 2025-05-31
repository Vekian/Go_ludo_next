import { GameReview, ReviewComment } from "@/interfaces";
import { getImg } from "@/lib/utils";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import React from "react";
import CommentActions from "./actions/CommentActions";
import { getDateFormated } from "@/lib/date";

export default function CommentCard({
  comment,
  review,
}: {
  comment: ReviewComment;
  review: GameReview;
}) {
  return (
    <div>
      <div className="bg-white rounded-lg pt-5 pb-5 px-5 md:px-10">
        <div className="flex flex-wrap justify-between gap-y-3 ">
          <div className="flex items-center gap-y-3 sm:order-first order-last">
            <Avatar
              alt={comment.account.username}
              src={getImg(comment.account.avatar)}
              sx={{
                width: 50,
                height: 50,
              }}
            />
            <div className="ml-8">
              <h3>{comment.account.username}</h3>
              <h5>{getDateFormated(comment.createdAt, comment.updatedAt)}</h5>
            </div>
          </div>
          <div className="flex items-center gap-x-4 justify-end w-full sm:justify-center sm:w-auto md:mb-0 -mb-5">
            <CommentActions comment={comment} review={review} />
            <FontAwesomeIcon icon={faFlag} fontSize={26} />
          </div>
        </div>
        <p className="mt-5">{comment.content}</p>
      </div>
    </div>
  );
}
