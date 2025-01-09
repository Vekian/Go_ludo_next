import { Game } from "@/interfaces";
import Image from "next/image";
import React from "react";

function GameAbout({ game }: { game: Game }) {
  return (
    <div
      id="onglet4"
      className="ongletContent absolute flex flex-col inset-10 opacity-0 translate-x-full transform"
    >
      <div className="flex flex-1">
        {game.creators.editors && (
          <div className="flex flex-col flex-1">
            <h4>Editeurs</h4>
            <div className="flex mt-2">
              {game.creators.editors.map((editor) => (
                <div
                  className="flex items-center flex-col ml-3"
                  key={editor.id}
                >
                  <Image
                    alt={editor.name}
                    src={editor.image}
                    width={50}
                    height={50}
                  />
                  <h5>{editor.name}</h5>
                </div>
              ))}
            </div>
          </div>
        )}
        {game.creators.authors && (
          <div className="flex flex-col flex-1">
            <h4>Editeurs</h4>
            <div className="flex mt-2">
              {game.creators.authors.map((author) => (
                <div
                  className="flex items-center flex-col ml-3"
                  key={author.id}
                >
                  <Image
                    alt={author.name}
                    src={author.image}
                    width={50}
                    height={50}
                  />
                  <h5>{author.name}</h5>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-1">
        {game.creators.illustrators && (
          <div className="flex flex-col flex-1">
            <h4>Editeurs</h4>
            <div className="flex mt-2">
              {game.creators.illustrators.map((illustrator) => (
                <div
                  className="flex items-center flex-col ml-3"
                  key={illustrator.id}
                >
                  <Image
                    alt={illustrator.name}
                    src={illustrator.image}
                    width={50}
                    height={50}
                  />
                  <h5>{illustrator.name}</h5>
                </div>
              ))}
            </div>
          </div>
        )}
        {game.awards && (
          <div className="flex flex-col flex-1">
            <h4>Editeurs</h4>
            <div className="flex mt-2">
              {game.awards.map((award) => (
                <div className="flex items-center flex-col ml-3" key={award.id}>
                  <Image
                    alt={award.name}
                    src={award.logo}
                    width={50}
                    height={50}
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
