"use client";
import ButtonSelect from "@/components/input/ButtonSelect";
import PartyDatePicker from "@/components/input/PartyDatePicker";
import PartyTimePicker from "@/components/input/PartyTimePicker";
import InputSearchCity from "@/components/input/search/InputSearchCity";
import DoubleSlider from "@/components/slider/DoubleSlider";
import ZoneSlider from "@/components/slider/ZoneSlider";
import {
  faLocationDot,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SliderThumb } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import "dayjs/locale/fr";

interface RangeThumbProps extends React.HTMLAttributes<unknown> {
  "data-index"?: number; // Ajout de la propriété manquante
}

dayjs.locale("fr");
function RangeThumbComponent(props: RangeThumbProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      {props["data-index"] === 0 ? (
        <FontAwesomeIcon
          icon={faMinus}
          className="MuiSlider-thumbIcon text-white"
        />
      ) : (
        <FontAwesomeIcon
          icon={faPlus}
          className="MuiSlider-thumbIcon text-white"
        />
      )}
    </SliderThumb>
  );
}

export default function FormLocalisation() {
  const [slideValue, setSlideValue] = React.useState(20);
  const [rangeValue, setRangeValue] = React.useState([2, 30]);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [timeStartValue, setTimeStartValue] = React.useState<Dayjs | null>(
    null
  );
  const [timeEndValue, setTimeEndValue] = React.useState<Dayjs | null>(null);

  const handleSliderChange = (
    event: Event,
    newSlideValue: number | number[]
  ) => {
    setSlideValue(newSlideValue as number);
  };

  const handleRangeChange = (
    event: Event,
    newRangeValue: number | number[]
  ) => {
    setRangeValue(newRangeValue as number[]);
  };
  return (
    <div className="bg-white flex-1 p-10 rounded-lg">
      <h2 className="mb-5">Avec qui veux-tu jouer ?</h2>
      <div className="flex  gap-x-10">
        <div className="flex-1">
          <InputSearchCity
            label="Où ? (ville, code postal...)"
            icon={faLocationDot}
          />
        </div>
        <div className="flex-1">
          <ButtonSelect
            label="Âge max"
            color="primary-900"
            options={[
              { id: 18, name: "18-24 ans" },
              { id: 25, name: "25-34 ans" },
              { id: 35, name: "35-44 ans" },
              { id: 45, name: "45-54 ans" },
              { id: 55, name: "55 ans et plus" },
            ]}
            name="age"
            width={250}
          />
        </div>
      </div>
      <div className="mt-5 flex gap-x-10">
        <div className="flex-1">
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
        <div className="flex-1">
          <div className="flex justify-between">
            <h5 className="font-semibold">Nombre de joueurs</h5>
            <h5 className="font-semibold">
              {rangeValue[0]} à {rangeValue[1]}
            </h5>
          </div>

          <DoubleSlider
            getAriaLabel={(index) =>
              index === 0 ? "Minimum price" : "Maximum price"
            }
            max={30}
            min={2}
            defaultValue={[5, 10]}
            valueLabelDisplay="auto"
            value={rangeValue}
            onChange={handleRangeChange}
            slots={{
              thumb: RangeThumbComponent,
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
              onChange={(newDate) => newDate && setSelectedDate(newDate)}
              className="w-1/2"
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  inputProps: { placeholder: " Sélectionnez une date" },
                },
              }}
            />
          </div>
          <div className="flex-1 flex gap-x-5">
            <div className="flex-1">
              <h5 className="font-semibold">De</h5>

              <PartyTimePicker
                ampm={false}
                value={timeStartValue}
                onChange={(timeStart) =>
                  timeStart && setTimeStartValue(timeStart)
                }
                slotProps={{ textField: { fullWidth: true, size: "small" } }}
              />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold">À</h5>
              <PartyTimePicker
                ampm={false}
                value={timeEndValue}
                onChange={(timeEnd) => timeEnd && setTimeEndValue(timeEnd)}
                slotProps={{ textField: { fullWidth: true, size: "small" } }}
              />
            </div>
          </div>
        </LocalizationProvider>
      </div>
    </div>
  );
}
