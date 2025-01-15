"use client";
import Onglet from "@/components/card/Onglet";
import React, { useState } from "react";
import UserStatus from "./UserStatus";
import { UserProfil } from "@/interfaces";

function UserContent({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserProfil;
}) {
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
    <div className="p-10 ">
      <div className="flex justify-between">
        <div className="w-1/3"></div>
        <div className="flex-1" onClick={() => handleClick(1)}>
          <Onglet
            label="Infos publiques"
            color="primary-500"
            angle={0}
            active={onglet === 1 ? true : false}
          />
        </div>
        <div className="flex-1" onClick={() => handleClick(2)}>
          <Onglet
            label="Paramètres"
            color="secondary-500"
            angle={1}
            active={onglet === 2 ? true : false}
          />
        </div>
        <div className="flex-1" onClick={() => handleClick(3)}>
          <Onglet
            label="Notifications"
            color="primary-800"
            angle={0}
            active={onglet === 3 ? true : false}
          />
        </div>
        <div className="flex-1" onClick={() => handleClick(4)}>
          <Onglet
            label="Confidentialité"
            color="neutral-500"
            angle={1}
            active={onglet === 4 ? true : false}
          />
        </div>
      </div>
      <div className=" bg-neutral-50 flex border-white border-2 shadow-card h-80 rounded-b-xxl text-primary-950 font-semibold p-8 z-40 relative">
        <div className="w-1/5">
          <UserStatus user={user} />
        </div>
        <div className="w-4/5 relative">{children}</div>
      </div>
    </div>
  );
}

export default UserContent;
