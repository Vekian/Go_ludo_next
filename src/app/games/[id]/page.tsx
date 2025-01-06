import React from "react";
import Carousel from "@/components/carousel/Carousel";
import Rating from "@/components/rating/Rating";

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
      <div className="flex bg-white rounded-lg shadow-lg">
        <div className="w-1/3 pt-5">
          <Carousel
            autoPlay={false}
            imgs={imgs}
            thumbs={true}
            height={300}
            width={200}
          />
        </div>
        <div className=" w-2/3">
          <div className="flex justify-between items-start p-10">
            <h2>Duel pour la terre du milieu</h2>
            <Rating />
          </div>
          <div>
            <div className="bg-neutral-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
