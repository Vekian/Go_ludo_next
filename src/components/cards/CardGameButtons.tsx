"use client";
import { faBarcode, faDice, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSnackbarContext } from "../provider/SnackbarProvider";
import { GameListItem } from "@/interfaces";
import { Tooltip } from "@mui/material";

function CardGameButtons({ game }: { game: GameListItem }) {
  const { showSnackbar } = useSnackbarContext();
  const [owned, setOwned] = useState(game.owned);
  const handleAdd = async () => {
    if (owned) {
      showSnackbar("Retrait du jeu de la collection", "info");
      const response = await fetch(`/api/collection/${game.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        showSnackbar(
          "Impossible de supprimer le jeu de la collection",
          "error"
        );
      } else {
        showSnackbar("Jeu supprimé de la collection", "success");
        setOwned(false);
      }
    } else {
      const body = {
        game: game.id,
      };
      showSnackbar("Jeu en cours d'ajout", "info");
      const response = await fetch("/api/collection", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        showSnackbar("Impossible d'ajouter le jeu à la collection", "error");
      } else {
        showSnackbar("Jeu ajouté à la collection", "success");
        setOwned(true);
      }
    }
  };
  return (
    <div className="float-right " onClick={handleAdd}>
      <Tooltip
        placement="top"
        title={`${
          owned ? "Supprimer de la collection" : "Ajouter à la collection"
        }`}
      >
        <div className="flex justify-center -ml-6 hover:bg-primary-50 bg-white rounded-lg w-10 py-3 cursor-pointer mb-2">
          <FontAwesomeIcon
            icon={faPlus}
            className={`transition-transform text-xl ${
              owned ? "rotate-45 text-primary-700" : "rotate-0 text-primary-500"
            }`}
          />
        </div>
      </Tooltip>
      <Tooltip placement="right" title="Scanner le jeu">
        <div className="flex justify-center -ml-6 hover:bg-primary-50 bg-white rounded-lg w-10 py-3 cursor-pointer mb-2">
          <FontAwesomeIcon icon={faBarcode} className="text-primary-950" />
        </div>
      </Tooltip>
      <Tooltip placement="bottom" title="Lancer une partie">
        <div className="flex justify-center -ml-6 hover:bg-primary-50 bg-white rounded-lg w-10 py-3 cursor-pointer">
          <FontAwesomeIcon icon={faDice} className="text-primary-600 text-xl" />
        </div>
      </Tooltip>
    </div>
  );
}

export default CardGameButtons;
