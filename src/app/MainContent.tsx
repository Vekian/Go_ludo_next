import ButtonPrimary from "@/components/button/ButtonPrimary";
import ButtonSelectXl from "@/components/button/ButtonSelectXl";
import { faDice, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Carousel from "@/components/carousel/Carousel";
import { ImageInterface } from "@/interfaces";
function MainContent() {
  const imgs: ImageInterface[] = [
    {
      id: 2,
      filepath: "/images/banniere/banniere.webp",
    },
    {
      id: 3,
      filepath: "/images/banniere/banniere2.jpg",
    },
  ];
  return (
    <div className="flex">
      <div className="w-2/3">
        <Carousel imgs={imgs} height={300} width={1000} />
      </div>
      <div className="w-1/3 flex pl-16 pr-16 flex-col items-center justify-center">
        <h1 className="text-primary-950 text-center mb-2">
          Près de chez vous, des joueurs vous attendent !
        </h1>
        <div className="w-full flex flex-col mb-3">
          <label className="mb-2">Chercher une partie</label>
          <ButtonSelectXl
            label="Où ? (ville, code postal...)"
            options={[
              { id: "2", label: "Saboteur", value: "Saboteur" },
              { id: "3", label: "6 qui prend", value: "6 qui prend" },
            ]}
            icon={faLocationDot}
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="mb-2">Une envie de jeu particulière ?</label>
          <ButtonSelectXl
            label="Un jeu, un thème..."
            options={[
              { id: "2", label: "Saboteur", value: "Saboteur" },
              { id: "3", label: "6 qui prend", value: "6 qui prend" },
            ]}
            icon={faDice}
          />
        </div>
        <ButtonPrimary label="Chercher" color="primary-600" />
      </div>
    </div>
  );
}

export default MainContent;
