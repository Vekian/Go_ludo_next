import React, { Suspense } from "react";
import Rating from "@/components/ui/rating/Rating";
import GameInfos from "@/components/layout/gamePage/GameInfos";
import GameTech from "@/components/layout/gamePage/GameTech";
import GameStats from "@/components/layout/gamePage/GameStats";
import GameAbout from "@/components/layout/gamePage/GameAbout";
import SimilarGames from "../../../components/layout/gamePage/SimilarGames";
import { getGame } from "@/lib/api/server/game";
import GameContent from "@/components/layout/gamePage/GameContent";
import Link from "next/link";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { theme } from "@/theme/theme";
import { getBaseUrl } from "@/lib/game";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/nextAuth";
import ListGames from "@/components/list/ListGames";
import ReviewsWrapper from "@/components/layout/gamePage/review/ReviewsWrapper";
import CarouselGame from "@/components/ui/carousel/CarouselGame";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const id = (await params).id;
  const reviewsPage = (await searchParams).reviews;
  const gameData = await getGame(id, "extension");
  if (!gameData.data) {
    throw new Error("Game not found");
  }
  const game = gameData.data.game;
  const session = await getServerSession(authOptions);

  return (
    <div className="lg:p-4 pt-10">
      <div className="flex bg-white rounded-lg flex-wrap">
        <div className="xl:w-1/3 w-full pt-5 flex justify-center overflow-x-hidden">
          <CarouselGame
            autoPlay={false}
            imgs={game.images.map((image) => image.filepath)}
            thumbs={true}
          />
        </div>
        <div className=" xl:w-2/3 w-full lg:p-5 ">
          <div className="flex justify-between items-start p-5">
            <h2>{game.name}</h2>
            {session && session.user.roles.includes("ROLE_ADMIN") && (
              <Link href={`/${getBaseUrl(game)}edit/${game.id}/1`}>
                <ButtonPrimary
                  label=""
                  icon={faPen}
                  color={theme.colors.primary[600]}
                />
              </Link>
            )}
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
      <ReviewsWrapper game={game} reviewsPage={reviewsPage} />
      {gameData.data.baseGames && gameData.data.baseGames.length > 0 && (
        <div className="mt-4 sm:pl-10 sm:pr-10 px-1">
          <div>
            <h2>Extensions</h2>
            <ListGames games={gameData.data.baseGames} keyName="extension" />
          </div>
        </div>
      )}
      <Suspense fallback={<p>Chargement...</p>}>
        <SimilarGames />
      </Suspense>
    </div>
  );
}

export default page;
