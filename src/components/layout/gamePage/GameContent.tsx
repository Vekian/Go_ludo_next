"use client";
import Onglet from "@/components/cards/Onglet";
import React, { useState } from "react";

function GameContent({ children }: { children: React.ReactNode }) {
  const [onglet, setOnglet] = useState(1);

  const handleClick = (number: number) => {
    setOnglet(number);
    const ongletContents =
      document.querySelectorAll<HTMLElement>(".ongletContent");
    if (ongletContents) {
      for (const ongletContent of ongletContents) {
        if (ongletContent.id === `onglet${number}`) {
          ongletContent.classList.remove("opacity-0", "translate-x-full");
          ongletContent.classList.add("opacity-100", "translate-x-0");
        } else {
          ongletContent.classList.add("opacity-0", "translate-x-full");
          ongletContent.classList.remove("opacity-100", "translate-x-0");
        }
      }
    }
  };
  return (
    <div className="p-5 ">
      <div className="flex justify-between">
        <div className="flex-1" onClick={() => handleClick(1)}>
          <Onglet
            label="Infos de jeu"
            color="primary-500"
            angle={0}
            active={onglet === 1 ? true : false}
          />
        </div>
        <div className="flex-1" onClick={() => handleClick(2)}>
          <Onglet
            label="Infos techniques"
            color="secondary-500"
            angle={1}
            active={onglet === 2 ? true : false}
          />
        </div>
        <div className="flex-1" onClick={() => handleClick(3)}>
          <Onglet
            label="Statistiques"
            color="primary-800"
            angle={0}
            active={onglet === 3 ? true : false}
          />
        </div>
        <div className="flex-1" onClick={() => handleClick(4)}>
          <Onglet
            label="À propos"
            color="neutral-500"
            angle={1}
            active={onglet === 4 ? true : false}
          />
        </div>
      </div>
      <div className=" bg-neutral-50 border-white border-2 overflow-x-hidden shadow-card h-80 rounded-b-xxl text-primary-950 font-semibold p-8 z-40 relative ">
        {children}
      </div>
    </div>
  );
}

export default GameContent;
