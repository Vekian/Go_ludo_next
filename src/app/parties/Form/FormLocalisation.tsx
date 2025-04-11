"use client";
import PartyDatePicker from "@/components/ui/input/PartyDatePicker";
import PartyTimePicker from "@/components/ui/input/PartyTimePicker";
import InputSearchCity from "@/components/ui/input/search/InputSearchCity";
import DoubleSlider from "@/components/ui/slider/DoubleSlider";
import ZoneSlider from "@/components/ui/slider/ZoneSlider";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { SelectChangeEvent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect } from "react";
import "dayjs/locale/fr";
import SelectClassic from "@/components/ui/input/SelectClassic";
import { theme } from "@/theme/theme";
import RangeThumb from "@/components/ui/input/range/RangeThumb";
import { GameLocalisation } from "@/interfaces";

dayjs.locale("fr");

export default function FormLocalisation({
  handleChange,
  errors,
}: {
  handleChange: (name: string, value: string | number | null) => void;
  errors: Record<string, string[]> | null;
}) {
  const [ageValue, setAgeValue] = React.useState("0");
  const [slideValue, setSlideValue] = React.useState(20);
  const [rangeValue, setRangeValue] = React.useState([2, 30]);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [timeStartValue, setTimeStartValue] = React.useState<Dayjs | null>(
    null
  );
  const [timeEndValue, setTimeEndValue] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    handleChange("playersMin", rangeValue[0]);
    handleChange("playersMax", rangeValue[1]);
    handleChange("zone", slideValue);
  }, []);

  const handleSliderChange = (
    event: Event,
    newSlideValue: number | number[]
  ) => {
    setSlideValue(newSlideValue as number);
    handleChange("zone", newSlideValue as number);
  };

  const handleRangeChange = (
    event: Event,
    newRangeValue: number | number[]
  ) => {
    if (Array.isArray(newRangeValue)) {
      setRangeValue(newRangeValue as number[]);
      handleChange("playersMin", newRangeValue[0]);
      handleChange("playersMax", newRangeValue[1]);
    }
  };

  const handleCityChange = (newCityValue: GameLocalisation | null) => {
    if (newCityValue) {
      handleChange("city", newCityValue.id);
    }
  };
  return (
    <div className="bg-white xl:flex-1 w-full flex-wrap p-10 rounded-lg">
      <h2 className="mb-5">Avec qui veux-tu jouer ?</h2>
      <div className="flex flex-wrap gap-x-10 gap-y-3">
        <div className="md:flex-1 w-full">
          <InputSearchCity
            label="Où ? (ville, code postal)"
            icon={faLocationDot}
            onChange={(value) => handleCityChange(value)}
          />
          {errors?.city && (
            <p className="text-red-500 text-sm">{errors.city}</p>
          )}
        </div>
        <div className="md:flex-1">
          <div className="lg:w-2/3">
            {" "}
            <SelectClassic
              value={ageValue}
              color={theme.colors.primary[800]}
              options={[
                { value: "0", label: "N'importe quel âge" },
                { value: "18", label: "18-24 ans" },
                { value: "25", label: "25-34 ans" },
                { value: "35", label: "35-44 ans" },
                { value: "45", label: "45-54 ans" },
                { value: "55", label: "55 ans et plus" },
              ]}
              onChange={(event: SelectChangeEvent<string>) => {
                setAgeValue(event.target.value);
                handleChange("age", event.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex-wrap flex gap-x-10 gap-y-3">
        <div className="md:flex-1 w-full">
          <div className="flex justify-between">
            <h5 className="font-semibold">Dans un rayon de</h5>
            <h5 className="font-semibold">{slideValue} km</h5>
          </div>
          <ZoneSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            value={slideValue}
            onChange={handleSliderChange}
          />
          <div className="flex justify-between text-neutral-400 text-sm -mt-2">
            <p>0 km</p>
            <p>100 km</p>
          </div>
        </div>
        <div className="md:flex-1 w-full">
          <div className="flex justify-between">
            <h5 className="font-semibold">Nombre de joueurs</h5>
            <h5 className="font-semibold">
              {rangeValue[0]} à {rangeValue[1]}
            </h5>
          </div>

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
      </div>
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
              format="DD/MM/YYYY"
              onChange={(newDate) => {
                if (newDate) {
                  setSelectedDate(newDate);
                  handleChange("date", newDate.format("YYYY-MM-DD"));
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
            {errors?.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>
          <div className="flex-1 flex gap-x-5">
            <div className="flex-1">
              <h5 className="font-semibold">De</h5>
              <PartyTimePicker
                ampm={false}
                value={timeStartValue}
                onChange={(timeStart) => {
                  if (timeStart) {
                    setTimeStartValue(timeStart);
                    handleChange("startTime", timeStart.format("HH:mm:ss"));
                  }
                }}
                slotProps={{ textField: { fullWidth: true, size: "small" } }}
              />
              {errors?.startTime && (
                <p className="text-red-500 text-sm">{errors.startTime}</p>
              )}
            </div>
            <div className="flex-1">
              <h5 className="font-semibold">À</h5>
              <PartyTimePicker
                ampm={false}
                value={timeEndValue}
                onChange={(timeEnd) => {
                  if (timeEnd) {
                    setTimeEndValue(timeEnd);
                    handleChange("endTime", timeEnd.format("HH:mm:ss"));
                  }
                }}
                slotProps={{ textField: { fullWidth: true, size: "small" } }}
              />
              {errors?.endTime && (
                <p className="text-red-500 text-sm">{errors.endTime}</p>
              )}
            </div>
          </div>
        </LocalizationProvider>
      </div>
    </div>
  );
}
