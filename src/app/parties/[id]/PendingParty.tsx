import { Party } from "@/interfaces/party.interface";
import React from "react";
import Infos from "./CardInfos/Infos";
import UserInfos from "./CardInfos/UserInfos";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import CardGame from "@/components/cards/CardGame";
import { GameListItem } from "@/interfaces";
import { theme } from "@/theme/theme";
import Chat from "./Chat/Chat";
import ButtonLeave from "./CardInfos/ButtonLeave";
import TabsCustom from "@/components/ui/tab/TabsCustom";
import CardParticipant from "@/components/cards/CardParticipant";

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
          <ButtonLeave party={party} />
        </div>
        <div>
          <h3>Participants :</h3>
          <TabsCustom scrollable="auto" classChild="pt-2">
            <CardParticipant
              participant={party.author}
              key={`participant${party.author.id}`}
            />
            {party.participants.map((participant) => (
              <CardParticipant
                participant={participant}
                key={`participant${participant.id}`}
              />
            ))}
          </TabsCustom>
        </div>
        <div className=" w-full">
          <h3>Jeux proposés :</h3>
          <TabsCustom scrollable="auto" classChild="pt-2">
            {party.games.map((game: GameListItem) => (
              <div key={`${game.id}list`} className="w-48">
                <CardGame game={game} logged={true} />
              </div>
            ))}
          </TabsCustom>
        </div>
      </div>
      <Chat party={party} />
    </div>
  );
}
