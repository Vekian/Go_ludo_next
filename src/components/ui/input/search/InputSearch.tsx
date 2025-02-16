"use client";
// ButtonSelect.tsx
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import dynamic from "next/dynamic";
import { theme } from "@/theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faE, faSearch } from "@fortawesome/free-solid-svg-icons";
import { GameListItem, Param } from "@/interfaces";
import { InputAdornment } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ListPaginated } from "@/interfaces/paginator.interface";
import { searchGames } from "@/lib/api/search";

const InputSearch = ({ label }: { label: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<GameListItem[]>([]);
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
    const gamesList: ListPaginated<GameListItem> = await searchGames(params);
    setOptions([...gamesList.items]);
    setLoading(false);
  }

  function handleChange(
    event: React.ChangeEvent<unknown>,
    value: GameListItem | null
  ) {
    if (value) {
      router.push(
        `/${value.type === "base" ? "game" : value.type}s/${value.id}`
      );
    }
  }

  const styleLabel = {
    border: "none",
    color: theme.colors.neutral[300],
    transform: "",
    fontFamily: "nunito",
    fontWeight: 700,
    fontSize: "17px",
    marginLeft: "50px",
  };

  return (
    <Autocomplete
      popupIcon={null}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      onChange={handleChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
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
        marginLeft: "10px",
        marginRight: "10px",
        ".MuiInputLabel-root": styleLabel,
        ".MuiAutocomplete-input": {
          marginLeft: "10px",
          marginRight: "10px",
        },
        ".MuiOutlinedInput-root": {
          borderRadius: "50px",
          fontFamily: "nunito",
          fontWeight: 700,
          backgroundColor: theme.colors.neutral[100],
        },
        ".MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
      renderOption={(props, option) => {
        const { key, ...rest } = props; // On extrait explicitement la clé
        return (
          <li
            key={`${key}${option.id}`}
            {...rest}
            className="flex items-center justify-between px-5 py-2 hover:bg-neutral-100 cursor-pointer"
          >
            <div className="flex items-center">
              <div className=" h-10 w-16 relative mr-4">
                <Image
                  alt={option.name}
                  src={`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${option.cover.filepath}`}
                  fill
                  className="object-contain"
                />
              </div>
              {option.name}
            </div>

            {option.type === "extension" && <FontAwesomeIcon icon={faE} />}
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
                    icon={faSearch}
                    style={{
                      color: theme.colors.primary[900],
                      marginLeft: 12,
                      marginRight: 0,
                      width: 20,
                    }}
                  />
                </InputAdornment>
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
export default dynamic(() => Promise.resolve(InputSearch), { ssr: false });
