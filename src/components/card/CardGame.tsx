import Image from "next/image";
import React from "react";
import Rating from "../rating/Rating";

function CardGame() {
  return (
    <div className="w-1/6 p-5">
      <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-md p-2 ">
        <Image
          alt="cover"
          src="/images/game_cover.png"
          width={100}
          height={100}
        />
        <h4 className="text-center mt-1">Duel pour la terre du milieu</h4>
        <Rating />
      </div>
    </div>
  );
}

export default CardGame;
