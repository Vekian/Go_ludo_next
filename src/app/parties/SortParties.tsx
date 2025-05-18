"use client";
import SelectClassic from "@/components/ui/input/SelectClassic";
import { theme } from "@/theme/theme";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function SortParties({
  countParties,
}: {
  countParties: number;
}) {
  const router = useRouter();
  return (
    <div className="flex gap-x-3 items-center">
      <h3>
        {countParties > 1
          ? `${countParties} parties trouvées`
          : `${countParties} partie trouvée`}
      </h3>
      <SelectClassic
        color={theme.colors.primary[800]}
        options={[
          { label: "Pertinence", value: "score" },
          { label: "Distance", value: "distance" },
        ]}
        value="score"
        onChange={(event: SelectChangeEvent<string>) => {
          router.push(`/parties?sort=${event.target.value}`);
        }}
      />
    </div>
  );
}
