"use client";
// ButtonSelect.tsx
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import dynamic from "next/dynamic";
import { theme } from "../../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress, InputAdornment } from "@mui/material";
import { getPublicGames } from "@/lib/api";
import { GameCard } from "@/interfaces";

const ButtonSelectXl = ({
  label,
  icon,
}: {
  label: string;
  icon: IconDefinition;
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<GameCard[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue.length > 2) {
      (async () => {
        setLoading(true);
        const games: GameCard[] = await getPublicGames([
          {
            key: "search",
            value: inputValue,
          },
        ]);
        setLoading(false);

        setOptions([...games]);
      })();
    }
  }, [inputValue]);

  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);
      const games: GameCard[] = await getPublicGames();
      setLoading(false);

      setOptions([...games]);
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

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
      popupIcon={
        <FontAwesomeIcon
          icon={faAngleDown}
          style={{ color: theme.colors.black }} // Couleur personnalisable
        />
      }
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      filterOptions={(x) => x}
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
          marginRight: "10px", // Change la couleur de la valeur sélectionnée
        },
        ".MuiOutlinedInput-root": {
          borderRadius: "50px",
          fontFamily: "nunito",
          fontWeight: 700,
          // Applique un border-radius au champ de texte à l'intérieur de l'Autocomplete
        },
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
export default dynamic(() => Promise.resolve(ButtonSelectXl), { ssr: false });
