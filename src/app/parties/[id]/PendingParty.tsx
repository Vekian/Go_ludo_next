import { Party } from "@/interfaces/party.interface";
import React from "react";
import Infos from "./CardInfos/Infos";
import UserInfos from "./CardInfos/UserInfos";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import ListParticipants from "@/components/list/ListParticipants";
import CardGame from "@/components/cards/CardGame";
import { GameListItem } from "@/interfaces";
import { theme } from "@/theme/theme";
import Chat from "./Chat/Chat";

export default function PendingParty({ party }: { party: Party }) {
  return (
    <div className="flex h-full gap-x-6">
      <div className="w-1/3 flex overflow-scroll flex-col gap-y-3">
        <div className="bg-white rounded-lg flex flex-wrap justify-center  gap-x-14 px-5 py-8">
          <div className="flex w-full justify-around">
            <UserInfos user={party.author} />
          </div>
          <Infos party={party} />
        </div>
        <div className="flex justify-around items-center">
          <ButtonPrimary
            label="Inviter un ami"
            color={theme.colors.primary[600]}
          />
          <ButtonSecondary
            label="Quitter le groupe"
            color={theme.colors.primary[800]}
          />
        </div>
        <div>
          <h3>Participants :</h3>
          <ListParticipants participants={party.participants} />
        </div>
        <div className=" w-full">
          <h3>Jeux proposés :</h3>
          <div className="flex  gap-5 mt-5">
            {party.games.map((game: GameListItem) => (
              <CardGame game={game} key={`${game.id}list`} />
            ))}
          </div>
        </div>
      </div>
      <Chat party={party} />
    </div>
  );
}
