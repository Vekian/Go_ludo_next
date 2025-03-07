"use client";
import InputText from "@/components/ui/input/InputText";
import RangeThumb from "@/components/ui/input/range/RangeThumb";
import TextAreaAutosize from "@/components/ui/input/TextAreaAutosize";
import DoubleSlider from "@/components/ui/slider/DoubleSlider";
import { theme } from "@/theme/theme";
import React, { useState } from "react";

export default function FormInfosParty() {
  const [rangeValue, setRangeValue] = useState([2, 30]);
  const [ageValue, setAgeValue] = useState([2, 30]);
  const [description, setDescription] = useState("");

  const handleRangeChange = (
    event: Event,
    newRangeValue: number | number[]
  ) => {
    if (Array.isArray(newRangeValue)) {
      setRangeValue(newRangeValue as number[]);
    }
  };

  const handleAgeChange = (event: Event, newAgeValue: number | number[]) => {
    if (Array.isArray(newAgeValue)) {
      setAgeValue(newAgeValue as number[]);
    }
  };
  return (
    <div className="bg-white rounded-lg px-36 py-6 w-full flex flex-col gap-y-3">
      <div className="flex gap-x-24">
        <div className="flex flex-col w-1/4">
          <label htmlFor="title" className="text-primary-950 font-semibold">
            Nom du groupe
          </label>
          <InputText value="" id="title" />
        </div>
        <div className="flex w-3/4 gap-x-12">
          <div className="flex-1">
            <label htmlFor="players" className="text-primary-950 font-semibold">
              Nombre de joueurs:
            </label>
            <DoubleSlider
              max={30}
              min={2}
              defaultValue={[5, 10]}
              valueLabelDisplay="auto"
              value={rangeValue}
              onChange={handleRangeChange}
              slots={{
                thumb: RangeThumb,
              }}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="players" className="text-primary-950 font-semibold">
              Age:
            </label>
            <DoubleSlider
              max={100}
              min={18}
              defaultValue={[5, 10]}
              valueLabelDisplay="auto"
              value={ageValue}
              onChange={handleAgeChange}
              slots={{
                thumb: RangeThumb,
              }}
              sx={{
                "& .MuiSlider-thumb": {
                  backgroundColor: theme.colors.primary[600],
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: theme.colors.primary[600],
                },
                color: theme.colors.primary[600],
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <TextAreaAutosize
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          sx={{
            backgroundColor: theme.colors.primary[50],
            border: "none",
            "&.MuiOutlinedInput-notchedOutline": {
              borderColor: theme.colors.primary[600],
            },
            "&.MuiOutlinedInput-input": {
              color: theme.colors.primary[600],
            },
            "&.MuiOutlinedInput-label": {
              color: theme.colors.primary[600],
            },
          }}
        />
      </div>
    </div>
  );
}
