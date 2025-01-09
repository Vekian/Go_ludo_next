import ButtonPrimary from "@/components/button/ButtonPrimary";
import SimpleSlider from "@/components/slider/SimpleSlider";
import { Game } from "@/interfaces";
import { getDurationFromTimestamp } from "@/lib/date";
import {
  faCakeCandles,
  faClock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function GameInfos({ game }: { game: Game }) {
  return (
    <div
      id="onglet1"
      className="ongletContent inset-10  opacity-100 translate-x-0  transform absolute flex flex-col justify-between"
    >
      <div className="flex justify-between">
        <h5 className="flex-1">
          <FontAwesomeIcon icon={faCakeCandles} className="pr-3 text-xl" />À
          partir de {game.ageMin} ans
        </h5>
        <h5 className="flex-1">
          <FontAwesomeIcon icon={faUsers} className="pr-3  text-xl" />
          De {game.playersMin} à {game.playersMax} joueurs
        </h5>
        <h5 className="flex-1">
          <FontAwesomeIcon icon={faClock} className="pr-3  text-xl" />
          Entre {getDurationFromTimestamp(game.playtimeMin)} et{" "}
          {getDurationFromTimestamp(game.playtimeMax)}
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
            {game.categories.categories &&
              game.categories.categories.map((theme) => (
                <ButtonPrimary
                  label={theme.name}
                  color="primary-500"
                  key={theme.id}
                />
              ))}
          </div>
        </div>
        <div className="flex-1">
          <h5>Mode de jeu</h5>
          <div>
            {game.categories.modes &&
              game.categories.modes.map((theme) => (
                <ButtonPrimary
                  label={theme.name}
                  color="secondary-500"
                  key={theme.id}
                />
              ))}
          </div>
        </div>
        <div className="flex-1">
          <h5>Thèmes</h5>
          <div>
            {game.categories.themes &&
              game.categories.themes.map((theme) => (
                <ButtonPrimary
                  label={theme.name}
                  color="neutral-500"
                  key={theme.id}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        {game.extensions?.length && (
          <h5 className="flex-1">
            {" "}
            {game.extensions.length} extension
            {game.extensions.length > 1 && "s"}
          </h5>
        )}
      </div>
    </div>
  );
}

export default GameInfos;
