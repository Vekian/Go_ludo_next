import React, { Suspense } from "react";
import Carousel from "@/components/ui/carousel/Carousel";
import Rating from "@/components/ui/rating/Rating";
import GameInfos from "@/components/gamePage/GameInfos";
import GameTech from "@/components/gamePage/GameTech";
import GameStats from "@/components/gamePage/GameStats";
import GameAbout from "@/components/gamePage/GameAbout";
import SimilarGames from "../../../components/gamePage/SimilarGames";
import { getGame } from "@/lib/api/api";
import { Game } from "@/interfaces";
import GameContent from "@/components/gamePage/GameContent";
import ReviewsList from "@/components/gamePage/review/ReviewsList";

async function page({ params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;
  const game: Game = await getGame(id, "base");

  return (
    <div className="p-4 pt-10">
      <div className="flex bg-white rounded-lg">
        <div className="w-1/3 pt-5">
          <Carousel
            autoPlay={false}
            imgs={game.imageGames}
            thumbs={true}
            height={300}
            width={200}
          />
        </div>
        <div className=" w-2/3 p-5">
          <div className="flex justify-between items-start p-5">
            <h2>{game.name}</h2>
            <Rating value={game.rating} />
          </div>
          <GameContent>
            <GameInfos game={game} />
            <GameTech game={game} />
            <GameStats game={game} />
            <GameAbout game={game} />
          </GameContent>
        </div>
      </div>
      <div className="bg-white rounded-lg mt-4 p-10">
        <h2>Description</h2>
        <p>{game.description}</p>
      </div>
      <ReviewsList game={game} />
      <Suspense fallback={<p>Chargement...</p>}>
        <SimilarGames game={game} />
      </Suspense>
    </div>
  );
}

export default page;
