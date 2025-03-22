import { GameListItem } from "@/interfaces";
import React from "react";
import CardGame from "../cards/CardGame";
import { ListPaginated } from "@/interfaces/paginator.interface";
import ArrowPaginator from "./pagination/ArrowPaginator";

function ListGames({ gameList }: { gameList: ListPaginated<GameListItem> }) {
  return (
    <div className="relative flex">
      {gameList.page > 1 && <ArrowPaginator type="prev" />}
      <div className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-6 gap-5 mt-5">
        {gameList.items.map((game: GameListItem) => (
          <div key={`${game.id}list`}>
            <CardGame game={game} />
          </div>
        ))}
      </div>
      {gameList.page < gameList.totalPages && <ArrowPaginator type="next" />}
    </div>
  );
}

export default ListGames;
