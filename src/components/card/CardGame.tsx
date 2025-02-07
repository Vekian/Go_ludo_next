import Image from "next/image";
import React from "react";
import Rating from "../ui/rating/Rating";
import { GameCard } from "@/interfaces";
import Link from "next/link";
import CardGameButtons from "./CardGameButtons";

function CardGame({ game }: { game: GameCard }) {
  return (
    <div className="drop-shadow-lg min-w-44">
      <CardGameButtons game={game} />

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
