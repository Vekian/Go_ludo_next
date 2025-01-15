"use client";
import Image from "next/image";
import React from "react";
import Rating from "../rating/Rating";
import { GameCard } from "@/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { AlertColor } from "@mui/material";

function CardGame({
  game,
  alert,
}: {
  game: GameCard;
  alert: (message: string, status: AlertColor) => void;
}) {
  const handleAdd = async () => {
    const body = {
      game: game.id,
    };
    alert("Jeu en cours d'ajout", "info");
    const response = await fetch("/api/collection", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      alert("Impossible d'ajouter le jeu à la collection", "error");
    } else {
      alert("Jeu ajouté à la collection", "success");
    }
  };
  return (
    <div className="drop-shadow-lg">
      <div
        className="float-right flex justify-center -ml-6 hover:bg-primary-50 bg-white rounded-lg w-10 py-3 cursor-pointer"
        onClick={handleAdd}
      >
        <FontAwesomeIcon icon={faPlus} className="text-primary-600 text-lg" />
      </div>
      <Link
        key={`${game.id}list`}
        href={`/${game.type === "base" ? "game" : game.type}s/${game.id}`}
      >
        <div className="flex flex-col items-center justify-center hover:bg-primary-50 bg-white rounded-md p-2 ">
          <div className="h-36 relative w-full max-w-36 ">
            <Image
              alt={game.name}
              src={`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${game.cover.filepath}`}
              fill
              className="object-contain"
            />
          </div>
          <h4 className="text-center mt-1">{game.name}</h4>
          <Rating value={game.rating} />
        </div>
      </Link>
    </div>
  );
}

export default CardGame;
