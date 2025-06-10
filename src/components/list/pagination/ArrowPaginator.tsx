"use client";
import { theme } from "@/theme/theme";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function ArrowPaginator({ type }: { type: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const handlePagination = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };
  return (
    <div
      className={`z-50 absolute bottom-1/3 ${
        type === "prev" ? "left-6" : "right-6"
      } `}
    >
      <IconButton
        aria-label="delete"
        size="large"
        onClick={() =>
          type === "prev"
            ? handlePagination(page - 1)
            : handlePagination(page + 1)
        }
        sx={{
          backgroundColor: theme.colors.white,
          "&:hover": {
            backgroundColor: theme.colors.neutral[50],
          },
        }}
      >
        {type === "prev" && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            color={theme.colors.primary[900]}
          />
        )}
        {type === "next" && (
          <FontAwesomeIcon
            icon={faArrowRight}
            color={theme.colors.primary[900]}
          />
        )}
      </IconButton>
    </div>
  );
}
