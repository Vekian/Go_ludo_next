import ButtonPrimary from "@/components/button/ButtonPrimary";
import SimpleSlider from "@/components/slider/SimpleSlider";
import {
  faCakeCandles,
  faClock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function GameInfos() {
  return (
    <div
      id="onglet1"
      className="ongletContent inset-10  opacity-100 translate-x-0  transform absolute flex flex-col justify-between"
    >
      <div className="flex justify-between">
        <h5 className="flex-1">
          <FontAwesomeIcon icon={faCakeCandles} className="pr-3 text-xl" />À
          partir de 6 ans
        </h5>
        <h5 className="flex-1">
          <FontAwesomeIcon icon={faUsers} className="pr-3  text-xl" />
          De 2 à 5 joueurs
        </h5>
        <h5 className="flex-1">
          <FontAwesomeIcon icon={faClock} className="pr-3  text-xl" />
          Entre 1 et 2 heures
        </h5>
      </div>
      <div className="flex">
        <div className="w-1/3 flex-1">
          <h5 className="mb-3">Mise en place</h5>
          <SimpleSlider value={20} />
        </div>
        <div className="w-2/3">
          <h5 className="mb-3">Complexité des règles</h5>
          <SimpleSlider value={80} />
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="flex-1">
          <h5>Catégories</h5>
          <div>
            <ButtonPrimary label="Jeu de cartes" color="primary-500" />
          </div>
        </div>
        <div className="flex-1">
          <h5>Mode de jeu</h5>
          <div>
            <ButtonPrimary label="Coopération" color="secondary-500" />
          </div>
        </div>
        <div className="flex-1">
          <h5>Thèmes</h5>
          <div>
            <ButtonPrimary label="Aventure" color="neutral-500" />
            <ButtonPrimary label="Médiévale" color="neutral-500" />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <h5 className="flex-1">6variantes</h5>
        <h5 className="flex-1">7 extensions</h5>
        <h5 className="flex-1">8 accessoires</h5>
      </div>
    </div>
  );
}

export default GameInfos;
