import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import SimpleSlider from "@/components/ui/slider/SimpleSlider";
import { Game } from "@/interfaces";
import { formatGameDuration } from "@/lib/date";
import { theme } from "@/theme/theme";
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
      className="ongletContent xl:inset-10 inset-6  opacity-100 translate-x-0  transform absolute flex flex-col justify-between gap-y-3"
    >
      <div className="flex justify-between flex-wrap gap-y-3">
        <h5 className="xl:flex-1 w-full">
          <FontAwesomeIcon icon={faCakeCandles} className="pr-3 text-xl" />À
          partir de {game.ageMin} ans
        </h5>
        <h5 className="xl:flex-1 w-full">
          <FontAwesomeIcon icon={faUsers} className="pr-3  text-xl" />
          De {game.playersMin} à {game.playersMax} joueurs
        </h5>
        <h5 className="xl:flex-1 w-full">
          <FontAwesomeIcon icon={faClock} className="pr-3  text-xl" />
          Entre {formatGameDuration(Number(game.playtimeMin))} et{" "}
          {formatGameDuration(Number(game.playtimeMax))}
        </h5>
      </div>
      <div className="flex gap-x-12 flex-wrap ">
        {game.rulesDifficulty && (
          <div className="flex-1">
            <p className="text-primary-950 font-semibold">
              Complexité des règles
            </p>
            <SimpleSlider value={game.rulesDifficulty} />
            <div className="flex justify-between -mt-2 ">
              <small className="text-secondary-600">simple</small>
              <small className="text-primary-600">complexe</small>
            </div>
          </div>
        )}
        {game.setupTime && (
          <div className="flex-1 flex flex-col ">
            <p className="text-primary-950 font-semibold">
              Temps de mise en place
            </p>
            <SimpleSlider value={game.setupTime} />
            <div className="flex justify-between -mt-2 ">
              <small className="text-secondary-600">rapide</small>
              <small className="text-primary-600">longue</small>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-between gap-y-3">
        {game.categories.categories &&
          game.categories.categories.length > 0 && (
            <div className="xl:flex-1 w-full">
              <h5>Catégories</h5>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {game.categories.categories.map((themeCategory) => (
                  <ButtonPrimary
                    label={themeCategory.name}
                    color={theme.colors.primary[500]}
                    key={themeCategory.id}
                  />
                ))}
              </div>
            </div>
          )}
        {game.categories.modes && game.categories.modes.length > 0 && (
          <div className="xl:flex-1 w-full">
            <h5>Mode de jeu</h5>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {game.categories.modes.map((themeCategory) => (
                <ButtonPrimary
                  label={themeCategory.name}
                  color={theme.colors.secondary[500]}
                  key={themeCategory.id}
                />
              ))}
            </div>
          </div>
        )}
        {game.categories.themes && game.categories.themes.length > 0 && (
          <div className="xl:flex-1 w-full">
            <h5>Thèmes</h5>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {game.categories.themes.map((themeCategory) => (
                <ButtonPrimary
                  label={themeCategory.name}
                  color={theme.colors.neutral[500]}
                  key={themeCategory.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        {game.extensions?.length && (
          <h5 className="flex-1">
            {game.extensions.length} extension
            {game.extensions.length > 1 && "s"}
          </h5>
        )}
      </div>
    </div>
  );
}

export default GameInfos;
