"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { theme } from "@/theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress, InputAdornment } from "@mui/material";
import { GameLocalisation, Param } from "@/interfaces";
import { searchCities } from "@/lib/api/search";

const InputSearchCity = ({
  label,
  icon,
  onChange,
  city,
}: {
  label: string;
  icon: IconDefinition;
  onChange?: (newCityValue: GameLocalisation | null) => void;
  city?: GameLocalisation | null;
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<GameLocalisation[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue.length > 2) {
      loadOptions([
        {
          key: "search",
          value: inputValue,
        },
      ]);
    } else if (inputValue === "") {
      loadOptions();
    }
  }, [inputValue]);

  const handleOpen = () => {
    setOpen(true);
    if (options.length === 0) {
      loadOptions();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function loadOptions(params?: Param[]) {
    setLoading(true);
    const cities = await searchCities(params);
    setOptions([...cities]);
    setLoading(false);
  }

  const styleLabel = {
    border: "none",
    color: theme.colors.neutral[300],
    transform: "",
    fontFamily: "nunito",
    fontWeight: 700,
    fontSize: "17px",
    marginLeft: "30px",
  };

  return (
    <Autocomplete
      popupIcon={
        <FontAwesomeIcon
          icon={faAngleDown}
          style={{ color: theme.colors.black }} // Couleur personnalisable
        />
      }
      open={open}
      value={city}
      onOpen={handleOpen}
      onClose={handleClose}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        if (onChange) {
          onChange(newValue ? newValue : null);
        }
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      inputValue={inputValue}
      clearOnBlur={false}
      filterOptions={(x) => x}
      noOptionsText="Pas de résultats..."
      slotProps={{
        paper: {
          sx: {
            fontFamily: "nunito",
            fontWeight: 700,
          },
        },
      }}
      sx={{
        ".MuiInputLabel-root": styleLabel,
        ".MuiAutocomplete-input": {
          marginLeft: "10px",
          marginRight: "10px", // Change la couleur de la valeur sélectionnée
        },
        ".MuiOutlinedInput-root": {
          borderRadius: "50px",
          fontFamily: "nunito",
          fontWeight: 700,
          // Applique un border-radius au champ de texte à l'intérieur de l'Autocomplete
        },
      }}
      renderOption={(props, option) => {
        const { key, ...rest } = props; // On extrait explicitement la clé

        return (
          <li
            key={`${key}${option.id}city`}
            {...rest}
            className="flex items-center  px-5 py-2 hover:bg-neutral-100 cursor-pointer"
          >
            <div>
              {option.name}{" "}
              <span className="text-neutral-400">({option.codePostal})</span>
            </div>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon
                    icon={icon}
                    style={{
                      color: theme.colors.primary[900],
                      marginLeft: 12,
                      marginRight: 0,
                      width: 20,
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
            inputLabel: {
              shrink: Boolean(params.inputProps?.value),
              style: params.inputProps?.value
                ? { transform: "translate(-26%,-30%)", fontSize: "0.8rem" }
                : {},
            },
          }}
        />
      )}
    />
  );
};

// Dynamic import with SSR disabled
export default InputSearchCity;
