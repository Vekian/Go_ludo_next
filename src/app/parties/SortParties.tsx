"use client";
import SelectClassic from "@/components/ui/input/SelectClassic";
import { theme } from "@/theme/theme";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function SortParties({
  countParties,
  searchParams,
}: {
  countParties: number;
  searchParams: Record<string, string>;
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
        value={searchParams.sort ?? "score"}
        onChange={(event: SelectChangeEvent<string>) => {
          const newSort = event.target.value;
          const params = new URLSearchParams(searchParams);

          // On met à jour / ajoute le paramètre 'sort'
          params.set("sort", newSort);

          // On pousse la nouvelle URL
          router.push(`/parties?${params.toString()}`);
        }}
      />
    </div>
  );
}
