"use client";
import { GameCard } from "@/interfaces";
import React, { SyntheticEvent } from "react";
import CardGame from "../card/CardGame";
import { Alert, AlertColor, Snackbar } from "@mui/material";

function ListGames({ games }: { games: GameCard[] }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<AlertColor>("info");

  const handleClick = (message: string, status: AlertColor) => {
    setOpen(true);
    setMessage(message);
    setStatus(status);
  };

  const handleClose = (
    event: Event | SyntheticEvent<Element, Event>,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="container grid grid-cols-6 gap-5 mt-5">
      {games.map((game: GameCard) => (
        <CardGame game={game} key={`${game.id}list`} alert={handleClick} />
      ))}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={(event) => handleClose(event)}
      >
        <Alert
          onClose={handleClose}
          severity={status}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ListGames;
