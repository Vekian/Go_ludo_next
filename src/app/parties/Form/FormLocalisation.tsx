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
import dayjs from "dayjs";
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
  formData,
}: {
  handleChange: (name: string, value: string | number | null) => void;
  errors: Record<string, string[]> | null;
  formData: Record<string, string | null | number>;
}) {
  const [city, setCity] = React.useState<GameLocalisation | null>(null);
  const [inputCity, setInputCity] = React.useState("");

  useEffect(() => {
    if (!formData.city) {
      setCity(null);
      setInputCity("");
    }
  }, [formData.city]);

  const handleSliderChange = (
    event: Event,
    newSlideValue: number | number[]
  ) => {
    handleChange("zone", newSlideValue as number);
  };

  const handleRangeChange = (
    event: Event,
    newRangeValue: number | number[]
  ) => {
    if (Array.isArray(newRangeValue)) {
      if (newRangeValue[0] != formData.playersMin) {
        handleChange("playersMin", newRangeValue[0]);
      } else if (newRangeValue[1] != formData.playersMax) {
        handleChange("playersMax", newRangeValue[1]);
      }
    }
  };

  const handleCityChange = (newCityValue: GameLocalisation | null) => {
    setCity(newCityValue);
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
            key={formData.city || "empty"}
            label="Où ? (ville, code postal)"
            icon={faLocationDot}
            onChange={(value) => handleCityChange(value)}
            city={city}
            value={inputCity}
            onInputChange={(value) => setInputCity(value)}
          />
          {errors?.city && (
            <p className="text-red-500 text-sm">{errors.city}</p>
          )}
        </div>
        <div className="md:flex-1">
          <div className="lg:w-2/3">
            {" "}
            <SelectClassic
              value={formData.age as string}
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
            <h5 className="font-semibold">{formData.zone} km</h5>
          </div>
          <ZoneSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            value={Number(formData.zone)}
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
              {formData.playersMin} à {formData.playersMax}
            </h5>
          </div>

          <DoubleSlider
            max={30}
            min={2}
            valueLabelDisplay="auto"
            value={[Number(formData.playersMin), Number(formData.playersMax)]}
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
              value={formData.date ? dayjs(formData.date) : null}
              format="DD/MM/YYYY"
              onChange={(newDate) => {
                if (newDate) {
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
                value={formData.date ? dayjs(formData.startTime) : null}
                onChange={(timeStart) => {
                  if (timeStart) {
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
                value={formData.date ? dayjs(formData.endTime) : null}
                onChange={(timeEnd) => {
                  if (timeEnd) {
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
