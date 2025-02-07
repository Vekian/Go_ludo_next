import { Party } from "@/interfaces/party.interface";
import React from "react";
import Infos from "./CardInfos/Infos";
import Author from "./CardInfos/Author";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import ListParticipants from "@/components/list/ListParticipants";
import CardGame from "@/components/card/CardGame";
import { GameCard } from "@/interfaces";

export default function PendingParty({ party }: { party: Party }) {
  return (
    <div className="flex h-full gap-x-6">
      <div className="w-1/3 flex overflow-scroll flex-col gap-y-3">
        <div className="bg-white rounded-lg flex flex-wrap justify-center  gap-x-14 px-5 py-8">
          <div className="flex w-full justify-around">
            <Author party={party} />
          </div>
          <Infos party={party} />
        </div>
        <div className="flex justify-around items-center">
          <ButtonPrimary label="Inviter un ami" color="primary-500" />
          <ButtonSecondary label="Quitter le groupe" color="primary-800" />
        </div>
        <div>
          <h3>Participants :</h3>
          <ListParticipants participants={party.participants} />
        </div>
        <div className=" w-full">
          <h3>Jeux proposés :</h3>
          <div className="flex  gap-5 mt-5">
            {party.games.map((game: GameCard) => (
              <CardGame game={game} key={`${game.id}list`} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-2/3 gap-y-6">
        <div className="bg-white rounded-lg h-4/5"></div>
        <div className="bg-white rounded-lg h-1/5"></div>
      </div>
    </div>
  );
}
