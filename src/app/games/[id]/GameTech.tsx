import {
  faBarcode,
  faCalendarDays,
  faRuler,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function GameTech() {
  return (
    <div
      id="onglet2"
      className="ongletContent z-10 inset-10 absolute flex flex-col opacity-0 translate-x-full transform"
    >
      <div className="flex h-full justify-between">
        <div className="flex flex-col justify-between flex-1">
          <h5 className="flex-1">
            <FontAwesomeIcon icon={faCalendarDays} className="pr-3 text-xl" />
            Sorti le 11 septembre 2024
          </h5>
          <h5 className="flex-1">
            <FontAwesomeIcon icon={faRuler} className="pr-3  text-xl" />
            27 x 20 x 7 cm
          </h5>
          <h5 className="flex-1">
            <FontAwesomeIcon icon={faWeight} className="pr-3  text-xl" />
            800g
          </h5>
          <h5 className="flex-1">
            <FontAwesomeIcon icon={faBarcode} className="pr-3  text-xl" />
            06570070707
          </h5>
        </div>
        <div className="flex-1 flex flex-col justify-start">
          <h5>Contenu</h5>
          <ul className="pl-3 flex flex-col flex-1 justify-around">
            <li>75 cartes</li>
            <li>50 jetons</li>
            <li>1 carnet de score</li>
          </ul>
        </div>
      </div>
      <div>
        <h5>Nécessite:</h5>
        <h6>Téléphone, connexion internet, environnement spacieux.</h6>
      </div>
    </div>
  );
}

export default GameTech;
