import Image from "next/image";
import React from "react";
import Rating from "@/components/ui/rating/Rating";
import { GameListItem } from "@/interfaces";
import Link from "next/link";
import CardGameButtons from "./actions/CardGameButtons";

function CardGame({ game, logged }: { game: GameListItem; logged: boolean }) {
  return (
    <div className="drop-shadow-lg min-w-36">
      {logged && <CardGameButtons game={game} />}
      <Link
        key={`${game.id}list`}
        href={`/${game.type === "base" ? "game" : game.type}s/${game.id}`}
      >
        <div className="flex flex-col items-center justify-center hover:bg-primary-50 bg-white rounded-md p-2 overflow-x-hidden">
          <div className="min-h-28 xs:h-36 h-28 max-h-32 relative w-full sm:max-w-36 max-w-28 ">
            {game.cover && (
              <Image
                alt={game.name}
                src={`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${game.cover}`}
                fill
                sizes="144px"
                className="object-contain"
              />
            )}
          </div>
          <div className="px-8 w-full">
            <div className="overflow-hidden h-12 flex items-center">
              <div className="flex items-start h-12">
                <h4 className="mt-1 ">{game.name}</h4>
              </div>
            </div>
          </div>

          <Rating value={game.rating} />
        </div>
      </Link>
    </div>
  );
}

export default CardGame;
