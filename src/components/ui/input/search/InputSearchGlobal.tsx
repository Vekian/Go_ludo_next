"use client";
import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { theme } from "@/theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress, InputAdornment } from "@mui/material";
import { GameListItem, Param } from "@/interfaces";
import { ListPaginated } from "@/interfaces/paginator.interface";
import { searchGames, searchGlobal } from "@/lib/api/search";

const InputSearchGlobal = ({
  label,
  icon,
  global = true,
  onChange,
  value,
  valueInput,
  onInputChange,
}: {
  label: string;
  icon: IconDefinition;
  global?: boolean;
  onChange?: (newCityValue: GameListItem | null) => void;
  value?: GameListItem | null;
  valueInput?: string;
  onInputChange?: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<GameListItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceTimeoutRef.current !== null) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = window.setTimeout(() => {
      if (valueInput !== undefined) {
        handleOptions(valueInput);
      } else {
        handleOptions(inputValue);
      }
    }, 300);

    return () => {
      if (debounceTimeoutRef.current !== null) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [inputValue, valueInput]);

  const handleOptions = (newValue: string) => {
    if (newValue.length > 2) {
      loadOptions([
        {
          key: "search",
          value: newValue,
        },
      ]);
    } else if (newValue === "") {
      loadOptions();
    }
  };

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
    if (global) {
      const games = await searchGlobal(params);
      setOptions([...games]);
    } else {
      const gamesList: ListPaginated<GameListItem> = await searchGames(params);
      setOptions([...gamesList.items]);
    }

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
      value={value}
      onOpen={handleOpen}
      onClose={handleClose}
      onInputChange={(event, newInputValue) => {
        if (onInputChange) {
          onInputChange(newInputValue);
        } else {
          setInputValue(newInputValue);
        }
      }}
      onChange={(event, object) => {
        if (onChange) {
          onChange(object);
        }
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      inputValue={valueInput !== undefined ? valueInput : inputValue}
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
        ".MuiTextField-root": {
          overflow: "hidden",
        },
      }}
      renderOption={(props, option) => {
        const { key, ...rest } = props; // On extrait explicitement la clé

        return (
          <li
            key={`${key}${option.id}game`}
            {...rest}
            className="flex items-center justify-between px-5 py-2 hover:bg-neutral-100 cursor-pointer"
          >
            <div>
              <div className="text-lg">{option.name}</div>
              <div className="text-neutral-400 text-md">
                {option.type === "base" ? "jeu" : option.type}
              </div>
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
export default InputSearchGlobal;
