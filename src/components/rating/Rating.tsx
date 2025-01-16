"use client";
import { Stack, Rating as MaterialRating } from "@mui/material";
import React from "react";
import { theme } from "../../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Rating({
  value,
  readOnly = true,
  onChange,
}: {
  value?: number | null;
  readOnly?: boolean;
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => void;
}) {
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center rounded-full z-40 bg-primary-600 text-lg font-bold text-white h-10 w-10">
        {value !== null ? value : "?"}
      </div>
      <div className="-ml-3 z-10">
        <Stack spacing={1}>
          <div className="flex items-center bg-primary-900 rounded-e-full pl-4 p-2">
            <MaterialRating
              name="rating"
              value={value}
              precision={0.5}
              onChange={onChange}
              readOnly={readOnly}
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
