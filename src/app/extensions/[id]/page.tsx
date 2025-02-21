import React, { Suspense } from "react";
import Carousel from "@/components/ui/carousel/Carousel";
import Rating from "@/components/ui/rating/Rating";
import GameInfos from "@/components/layout/gamePage/GameInfos";
import GameTech from "@/components/layout/gamePage/GameTech";
import GameStats from "@/components/layout/gamePage/GameStats";
import GameAbout from "@/components/layout/gamePage/GameAbout";
import SimilarGames from "../../../components/layout/gamePage/SimilarGames";
import { getGame } from "@/lib/api/api";
import { Game } from "@/interfaces";
import GameContent from "@/components/layout/gamePage/GameContent";
import ReviewsList from "@/components/layout/gamePage/review/ReviewsList";

async function page({ params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;
  const game: Game = await getGame(id, "extension");

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
      <ReviewsList />
      <Suspense fallback={<p>Chargement...</p>}>
        <SimilarGames game={game} />
      </Suspense>
    </div>
  );
}

export default page;
