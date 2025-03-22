"use client";
import InputText from "@/components/ui/input/InputText";
import PartyDatePicker from "@/components/ui/input/PartyDatePicker";
import PartyTimePicker from "@/components/ui/input/PartyTimePicker";
import RangeThumb from "@/components/ui/input/range/RangeThumb";
import TextAreaAutosize from "@/components/ui/input/TextAreaAutosize";
import DoubleSlider from "@/components/ui/slider/DoubleSlider";
import { theme } from "@/theme/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

dayjs.locale("fr");

export default function FormInfosParty({
  errors,
}: {
  errors: Record<string, string[]> | null;
}) {
  const [rangeValue, setRangeValue] = useState([2, 30]);
  const [ageValue, setAgeValue] = useState([2, 30]);
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [timeValue, setTimeValue] = React.useState<Dayjs | null>(null);

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
          {errors?.title && <p className="text-red-500">{errors.title[0]}</p>}
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
              name="players"
              value={rangeValue}
              onChange={handleRangeChange}
              slots={{
                thumb: RangeThumb,
              }}
            />
            {errors?.playersMin && (
              <p className="text-red-500">{errors.playersMin[0]}</p>
            )}
            {errors?.playersMax && (
              <p className="text-red-500">{errors.playersMax[0]}</p>
            )}
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
              name="age"
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
            {errors?.ageMin && (
              <p className="text-red-500">{errors.ageMin[0]}</p>
            )}
            {errors?.ageMax && (
              <p className="text-red-500">{errors.ageMax[0]}</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-x-10 mt-5">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{
              cancelButtonLabel: "Annuler", // Personnaliser le bouton Cancel
              okButtonLabel: "Valider", // Personnaliser le bouton OK
            }}
          >
            <div className="flex-1">
              <h5 className="font-semibold">Disponibilités</h5>
              <PartyDatePicker
                value={selectedDate}
                format="YYYY-MM-DD"
                name="meetingDate"
                onChange={(newDate) => {
                  if (newDate) {
                    setSelectedDate(newDate);
                  }
                }}
                className="md:w-1/2"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    inputProps: { placeholder: " Sélectionnez une date" },
                  },
                }}
              />
              {errors?.meetingDate && (
                <p className="text-red-500">{errors.meetingDate[0]}</p>
              )}
            </div>
            <div className="flex-1 flex gap-x-5">
              <div className="max-w-44">
                <h5 className="font-semibold">À</h5>
                <PartyTimePicker
                  ampm={false}
                  value={timeValue}
                  name="meetingTime"
                  onChange={(timeStart) => {
                    if (timeStart) {
                      setTimeValue(timeStart);
                    }
                  }}
                  slotProps={{ textField: { fullWidth: true, size: "small" } }}
                />
                {errors?.meetingTime && (
                  <p className="text-red-500">{errors.meetingTime[0]}</p>
                )}
              </div>
            </div>
          </LocalizationProvider>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <TextAreaAutosize
          minRows={3}
          value={description}
          name="description"
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
        {errors?.description && (
          <p className="text-red-500">{errors.description[0]}</p>
        )}
      </div>
    </div>
  );
}
