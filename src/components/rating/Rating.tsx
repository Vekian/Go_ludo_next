"use client";
import { Stack, Rating as MaterialRating } from "@mui/material";
import React from "react";
import { theme } from "../../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Rating() {
  return (
    <div className="flex items-center">
      <div className="rounded-full z-50 bg-primary-600 text-lg font-bold text-white pl-3 pr-3 pt-1 pb-1">
        4
      </div>
      <div className="-ml-3 z-10">
        <Stack spacing={1}>
          <div className="flex items-center bg-primary-900 rounded-e-full pl-4 p-2">
            <MaterialRating
              name="half-rating"
              defaultValue={4}
              precision={0.5}
              readOnly
              icon={
                <FontAwesomeIcon
                  icon={faStar}
                  style={{
                    color: theme.colors.primary[400],
                    fontSize: "12px",
                    marginRight: "3px",
                  }}
                />
              }
              emptyIcon={
                <FontAwesomeIcon
                  icon={faStar}
                  style={{
                    color: theme.colors.neutral[200],
                    fontSize: "12px",
                    marginRight: "3px",
                  }}
                />
              }
            />
          </div>
        </Stack>
      </div>
    </div>
  );
}

export default Rating;
