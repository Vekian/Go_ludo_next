"use client";
import NumberPaginator from "@/components/list/pagination/NumberPaginator";
import { ReviewList } from "@/interfaces";
import { useRouter } from "next/navigation";
import React from "react";

export default function ListReviews({
  reviewList,
}: {
  reviewList: ReviewList;
}) {
  const router = useRouter();
  const handlePagination = (page: number) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("reviews", page.toString());

    router.push(currentUrl.toString(), { scroll: false });
  };

  return (
    <div className="p-5">
      <NumberPaginator
        page={reviewList.page}
        totalPages={reviewList.totalPages}
        handlePagination={handlePagination}
      />
    </div>
  );
}
