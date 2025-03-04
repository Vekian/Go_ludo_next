"use client";
import React, { useState } from "react";
import SelectClassic from "../../input/SelectClassic";
import { theme } from "@/theme/theme";
import { SelectChangeEvent } from "@mui/material";

export default function TimeFilter() {
  const [time, setTime] = useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setTime(event.target.value);
  };
  return (
    <div className="w-32">
      <SelectClassic
        value={time}
        options={[
          { value: "30", label: "30 minutes" },
          { value: "60", label: "1 heure" },
          { value: "90", label: "1 heure 30 min" },
          { value: "120", label: "2 heures" },
        ]}
        color={theme.colors.primary[700]}
        label="Durée"
        onChange={handleChange}
      />
    </div>
  );
}
