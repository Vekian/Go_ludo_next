import Image from "next/image";
import React from "react";
import Rating from "../rating/Rating";
import { GameCard } from "@/interfaces";

function CardGame({ game }: { game: GameCard }) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center hover:bg-primary-50 bg-white shadow-lg rounded-md p-2 ">
        <div className="h-36 relative w-full max-w-36">
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
    </div>
  );
}

export default CardGame;
