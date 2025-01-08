import React from "react";
import Carousel from "@/components/carousel/Carousel";
import Rating from "@/components/rating/Rating";
import GameInfos from "./GameInfos";
import Onglet from "@/components/card/Onglet";

interface Params {
  id: string; // Vous pouvez ajuster le type en fonction de vos besoins
}
function page({ params }: { params: Params }) {
  const imgs: [] = [
    {
      id: 2,
      src: "/images/game_cover.png",
      alt: "banniere",
    },
    {
      id: 3,
      src: "/images/game_cover.png",
      alt: "banniere",
    },
  ];

  return (
    <div className="bg-neutral-100 p-4 pt-10">
      <div className="flex bg-white rounded-lg ">
        <div className="w-1/3 pt-5">
          <Carousel
            autoPlay={false}
            imgs={imgs}
            thumbs={true}
            height={300}
            width={200}
          />
        </div>
        <div className=" w-2/3 p-5">
          <div className="flex justify-between items-start p-5">
            <h2>Duel pour la terre du milieu</h2>
            <Rating />
          </div>
          <div className="p-5 ">
            <div className="flex justify-between">
              <div className="flex-1">
                <Onglet
                  label="Infos de jeu"
                  color="primary-500"
                  angle={0}
                  active={true}
                />
              </div>
              <div className="flex-1">
                <Onglet
                  label="Infos techniques"
                  color="secondary-500"
                  angle={1}
                />
              </div>
              <div className="flex-1">
                <Onglet label="Statistiques" color="primary-800" angle={0} />
              </div>
              <div className="flex-1">
                <Onglet label="À propos" color="neutral-500" angle={1} />
              </div>
            </div>
            <div className="h-full bg-neutral-50 border-white border-2 shadow-lg rounded-b-xxl text-primary-950 font-semibold p-8 z-50 relative">
              <GameInfos />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
