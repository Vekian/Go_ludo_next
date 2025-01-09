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
        <div className="flex flex-col flex-1">
          <h4>Editeurs</h4>
          <div className="flex mt-2">
            <div className="flex items-center flex-col ml-3">
              <Image
                alt="person"
                src="/images/person.png"
                width={50}
                height={50}
              />
              <h5>Repos production</h5>
            </div>
            <div className="flex items-center flex-col ml-3">
              <Image
                alt="person"
                src="/images/person.png"
                width={50}
                height={50}
              />
              <h5>Ludo</h5>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <h4>Auteurs</h4>
          <div className="flex mt-2">
            <div className="flex items-center flex-col ml-3">
              <Image
                alt="person"
                src="/images/person.png"
                width={50}
                height={50}
              />
              <h5>Antoine Beauza</h5>
            </div>
            <div className="flex items-center flex-col ml-3">
              <Image
                alt="person"
                src="/images/person.png"
                width={50}
                height={50}
              />
              <h5>Bruno Cathela</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col flex-1">
          <h4>Illustrateurs</h4>
          <div className="flex mt-2">
            <div className="flex items-center flex-col ml-3">
              <Image
                alt="person"
                src="/images/person.png"
                width={50}
                height={50}
              />
              <h5>Repos production</h5>
            </div>
            <div className="flex  items-center flex-col ml-3">
              <Image
                alt="person"
                src="/images/person.png"
                width={50}
                height={50}
              />
              <h5>Ludo</h5>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <h4>Récompenses</h4>
          <div className="flex mt-2">
            <div className="flex  items-center flex-col ml-3">
              <Image
                alt="person"
                src="/images/person.png"
                width={50}
                height={50}
              />
              <h5>Antoine Beauza</h5>
            </div>
            <div className="flex  items-center flex-col ml-3">
              <Image
                alt="person"
                src="/images/person.png"
                width={50}
                height={50}
              />
              <h5>Bruno Cathela</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameAbout;
