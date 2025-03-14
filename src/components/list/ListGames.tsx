import { GameListItem } from "@/interfaces";
import React from "react";
import CardGame from "../cards/CardGame";
import ButtonPrimary from "../ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonSecondary from "../ui/button/ButtonSecondary";

function ListGames({
  games,
  addGame,
  removeGame,
}: {
  games: GameListItem[];
  addGame?: (game: GameListItem) => void;
  removeGame?: (game: GameListItem) => void;
}) {
  return (
    <div className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-6 gap-5 mt-5">
      {games.map((game: GameListItem) => (
        <div key={`${game.id}list`}>
          <CardGame game={game} />
          {addGame && (
            <div className="flex justify-center mt-3">
              <ButtonPrimary
                label="Ajouter"
                color={theme.colors.primary[500]}
                icon={faPlus}
                onClick={() => addGame(game)}
              />
            </div>
          )}
          {removeGame && (
            <div className="flex justify-center mt-3">
              <ButtonSecondary
                label=""
                color={theme.colors.primary[700]}
                onClick={() => removeGame(game)}
                icon={faTrash}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ListGames;
