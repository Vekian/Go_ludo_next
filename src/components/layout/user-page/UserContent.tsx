"use client";
import Onglet from "@/components/cards/Onglet";
import React, { useState } from "react";
import UserStatus from "./UserStatus";
import { UserProfil } from "@/interfaces";
import { theme } from "@/theme/theme";
import TabsCustom from "@/components/ui/tab/TabsCustom";

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
    <div className="lg:p-10 p-3">
      <div className="flex">
        <div className="lg:w-1/4 w-0"></div>
        <div className="lg:w-3/4 w-full">
          <TabsCustom>
            <div className="flex-1" onClick={() => handleClick(1)}>
              <Onglet
                label="Infos publiques"
                color={theme.colors.primary[500]}
                angle={0}
                active={onglet === 1 ? true : false}
              />
            </div>
            <div className="flex-1" onClick={() => handleClick(2)}>
              <Onglet
                label="Paramètres"
                color={theme.colors.secondary[500]}
                angle={1}
                active={onglet === 2 ? true : false}
              />
            </div>
            <div className="flex-1" onClick={() => handleClick(3)}>
              <Onglet
                label="Notifications"
                color={theme.colors.primary[800]}
                angle={0}
                active={onglet === 3 ? true : false}
              />
            </div>
            <div className="flex-1" onClick={() => handleClick(4)}>
              <Onglet
                label="Confidentialité"
                color={theme.colors.neutral[500]}
                angle={1}
                active={onglet === 4 ? true : false}
              />
            </div>
          </TabsCustom>
        </div>
      </div>

      <div className=" bg-neutral-50 flex  gap-x-12  border-white border-2 shadow-card h-80 rounded-b-xxl text-primary-950 font-semibold p-4 xl2:p-8 z-40">
        <div className="lg:w-1/5 sm:w-auto lg:block hidden ">
          <UserStatus user={user} />
        </div>
        <div className="lg:w-4/5 w-full relative overflow-x-hidden overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}

export default UserContent;
