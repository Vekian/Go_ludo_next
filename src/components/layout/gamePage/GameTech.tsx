import { Game } from "@/interfaces";
import { formatDate } from "@/lib/date";
import {
  faBarcode,
  faCalendarDays,
  faRuler,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function GameTech({ game }: { game: Game }) {
  return (
    <div
      id="onglet2"
      className="ongletContent z-10 inset-10 absolute flex flex-col opacity-0 translate-x-full transform"
    >
      <div className="flex h-full justify-between flex-wrap">
        <div className="flex flex-col justify-between md:flex-1 w-full">
          <h5 className="flex-1 ">
            <FontAwesomeIcon icon={faCalendarDays} className="pr-3 text-xl" />
            Sorti le {formatDate(game.publishedAt)}
          </h5>
          {game.width && game.height && game.length && (
            <h5 className="flex-1">
              <FontAwesomeIcon icon={faRuler} className="pr-3  text-xl" />
              {game.length} x {game.width} x {game.height} cm
            </h5>
          )}
          {game.weight && (
            <h5 className="flex-1">
              <FontAwesomeIcon icon={faWeight} className="pr-3  text-xl" />
              {game.weight}g
            </h5>
          )}
          {game.barCode && (
            <h5 className="flex-1">
              <FontAwesomeIcon icon={faBarcode} className="pr-3  text-xl" />
              {game.barCode}
            </h5>
          )}
        </div>
        <div className="md:flex-1 w-full flex flex-col justify-start">
          <h5 className="text-lg">Contenu</h5>
          <ul className="pl-3 flex md:flex-col flex-wrap  flex-1 justify-around">
            <li>75 cartes</li>
            <li>50 jetons</li>
            <li>1 carnet de score</li>
          </ul>
        </div>
      </div>
      <div>
        <h5 className="text-lg">Nécessite:</h5>
        <h6>Téléphone, connexion internet, environnement spacieux.</h6>
      </div>
    </div>
  );
}

export default GameTech;
