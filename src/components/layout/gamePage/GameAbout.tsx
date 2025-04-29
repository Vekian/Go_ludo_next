import ListCreators from "@/components/list/ListCreators";
import { Game } from "@/interfaces";
import { CreatorJob, jobNames } from "@/interfaces/creator.interface";
import { getImg } from "@/lib/utils";
import { Avatar } from "@mui/material";
import React from "react";

function GameAbout({ game }: { game: Game }) {
  return (
    <div
      id="onglet4"
      className="ongletContent absolute flex flex-col gap-y-6 inset-10 opacity-0 translate-x-full transform"
    >
      <div className="flex flex-1">
        {game.awards && game.awards.length > 0 && (
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
      </div>{" "}
      <div className="flex flex-1 flex-wrap gap-y-6">
        {Object.values(CreatorJob).map(
          (job) =>
            game.creators[job] && (
              <div key={jobNames[job]} className="w-1/3">
                <ListCreators
                  creators={game.creators[job]}
                  title={`${jobNames[job]}s`}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default GameAbout;
