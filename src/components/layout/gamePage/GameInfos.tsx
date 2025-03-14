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
      <div className="flex flex-wrap justify-center">
        <div className="xl:w-1/3 xs:w-1/2 w-full">
          <h5 className="mb-3">Mise en place</h5>
          <SimpleSlider value={20} />
        </div>
        <div className="xl:w-2/3 xs:w-1/2 w-full">
          <h5 className="mb-3">Complexité des règles</h5>
          <SimpleSlider value={80} />
        </div>
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
