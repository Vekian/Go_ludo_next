"use client";
import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { theme } from "@/theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress, InputAdornment } from "@mui/material";
import { Param } from "@/interfaces";
import { searchCities } from "@/lib/api/search";
import { CityListItem } from "@/interfaces/localisation.interface";

const InputSearchCity = ({
  label,
  icon,
  onChange,
  city,
  value,
  onInputChange,
}: {
  label: string;
  icon: IconDefinition;
  onChange?: (newCityValue: CityListItem | null) => void;
  city?: CityListItem | null;
  value?: string;
  onInputChange?: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CityListItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceTimeoutRef.current !== null) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = window.setTimeout(() => {
      if (value !== undefined) {
        handleOptions(value);
      } else {
        handleOptions(inputValue);
      }
    }, 300);

    return () => {
      if (debounceTimeoutRef.current !== null) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [inputValue, value]);

  const handleOpen = () => {
    setOpen(true);
    if (options.length === 0) {
      loadOptions();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptions = (value: string) => {
    if (value.length > 2) {
      loadOptions([
        {
          key: "search",
          value: value,
        },
      ]);
    } else if (value === "") {
      loadOptions();
    }
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
    paddingLeft: "30px",
    paddingRight: "20px",
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
        if (onInputChange) {
          onInputChange(newInputValue);
        } else {
          setInputValue(newInputValue);
        }
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
      inputValue={value !== undefined ? value : inputValue}
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
        marginLeft: "10px",
        marginRight: "10px",
        ".MuiInputLabel-root": styleLabel,
        ".MuiAutocomplete-input": {
          marginRight: "10px",
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
              sx: {
                "& input": {
                  paddingLeft: "12px",
                },
              },
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
