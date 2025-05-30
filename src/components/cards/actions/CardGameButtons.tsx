"use client";
import { faDice, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import { GameListItem } from "@/interfaces";
import { Tooltip } from "@mui/material";
import {
  addGameToCollection,
  deleteGameFromCollection,
} from "@/lib/api/server/collection";
import { useRouter } from "next/navigation";

function CardGameButtons({ game }: { game: GameListItem }) {
  const router = useRouter();
  const { showSnackbar } = useSnackbarContext();
  const [owned, setOwned] = useState(game.owned);
  const handleAdd = async () => {
    if (owned) {
      showSnackbar("Retrait du jeu de la collection", "info");
      const response = await deleteGameFromCollection(game.id);
      if (!response.ok) {
        showSnackbar(response.message, "error");
      } else {
        showSnackbar(response.message, "success");
        setOwned(false);
      }
    } else {
      showSnackbar("Jeu en cours d'ajout", "info");
      const response = await addGameToCollection(game.id);
      if (!response.ok) {
        showSnackbar(response.message, "error");
      } else {
        showSnackbar(response.message, "success");
        setOwned(true);
      }
    }
  };

  return (
    <div className="float-right ">
      <Tooltip
        placement="top"
        title={`${
          owned ? "Supprimer de la collection" : "Ajouter à la collection"
        }`}
      >
        <div
          className="flex justify-center -ml-6 hover:bg-primary-50 bg-white rounded-lg w-10 py-3 cursor-pointer mb-2"
          onClick={handleAdd}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className={`transition-transform text-xl ${
              owned ? "rotate-45 text-primary-700" : "rotate-0 text-primary-500"
            }`}
          />
        </div>
      </Tooltip>
      <Tooltip placement="bottom" title="Lancer une partie">
        <div
          className="flex justify-center -ml-6 hover:bg-primary-50 bg-white rounded-lg w-10 py-3 cursor-pointer"
          onClick={() => router.push("/parties/create?game=" + game.id)}
        >
          <FontAwesomeIcon icon={faDice} className="text-primary-600 text-xl" />
        </div>
      </Tooltip>
    </div>
  );
}

export default CardGameButtons;
