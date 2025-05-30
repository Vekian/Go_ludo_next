import { ReviewComment } from "@/interfaces";
import { getImg } from "@/lib/utils";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import React from "react";

export default function CommentCard({ comment }: { comment: ReviewComment }) {
  return (
    <div>
      <div className="bg-white rounded-lg pt-5 pb-5 pl-10 pr-10">
        <div className="flex flex-wrap justify-between gap-y-3 ">
          <div className="flex flex-wrap items-center gap-y-3 sm:order-first order-last">
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
              <h5>Il y a 6 semaines</h5>
            </div>
          </div>
          <div className="flex items-center gap-x-4 justify-end w-full sm:justify-center sm:w-auto ">
            <FontAwesomeIcon icon={faFlag} fontSize={26} />
          </div>
        </div>
        <p className="mt-5">{comment.content}</p>
      </div>
    </div>
  );
}
