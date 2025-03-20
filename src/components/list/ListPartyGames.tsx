import { GameListItem } from "@/interfaces";
import React from "react";
import CardGame from "../cards/CardGame";
import ButtonPrimary from "../ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonSecondary from "../ui/button/ButtonSecondary";

function ListPartyGames({
  games,
  gamesAdd,
  addGame,
  removeGame,
}: {
  games: GameListItem[];
  gamesAdd?: GameListItem[] | null;
  addGame: (game: GameListItem) => void;
  removeGame: (game: GameListItem) => void;
}) {
  const displayButton = (game: GameListItem) => {
    if (gamesAdd && gamesAdd.some((g) => g.id === game.id)) {
      return (
        <ButtonSecondary
          label="Retirer"
          color={theme.colors.primary[700]}
          onClick={() => removeGame(game)}
          icon={faTrash}
        />
      );
    } else {
      return (
        <ButtonPrimary
          label="Ajouter"
          color={theme.colors.primary[500]}
          icon={faPlus}
          onClick={() => addGame(game)}
        />
      );
    }
  };
  return (
    <div className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-6 gap-5 mt-5">
      {games.map((game: GameListItem) => (
        <div key={`${game.id}list`}>
          <CardGame game={game} />
          <div className="flex justify-center mt-3">{displayButton(game)}</div>
        </div>
      ))}
    </div>
  );
}

export default ListPartyGames;
