import ListCreators from "@/components/list/ListCreators";
import { Game } from "@/interfaces";
import { getImg } from "@/lib/utils";
import { Avatar } from "@mui/material";
import React from "react";

function GameAbout({ game }: { game: Game }) {
  return (
    <div
      id="onglet4"
      className="ongletContent absolute flex flex-col inset-10 opacity-0 translate-x-full transform"
    >
      <div className="flex flex-1">
        {game.creators.editors && game.creators.editors.length > 0 && (
          <ListCreators creators={game.creators.editors} title="Éditeurs" />
        )}
        {game.creators.authors && game.creators.authors.length > 0 && (
          <ListCreators creators={game.creators.authors} title="Auteurs" />
        )}
      </div>
      <div className="flex flex-1">
        {game.creators.illustrators &&
          game.creators.illustrators.length > 0 && (
            <ListCreators
              creators={game.creators.illustrators}
              title="Illustrateurs"
            />
          )}

        {game.awards && (
          <div className="flex flex-col flex-1">
            <h4>Récompenses</h4>
            <div className="flex mt-2">
              {game.awards.map((award) => (
                <div className="flex items-center flex-col ml-3" key={award.id}>
                  <Avatar
                    alt={award.name}
                    src={getImg(award.image)}
                    sx={{ width: 50, height: 50 }}
                  />
                  <h5>{award.name}</h5>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameAbout;
