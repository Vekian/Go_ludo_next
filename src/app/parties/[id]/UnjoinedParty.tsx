import ListGames from "@/components/list/ListGames";
import ListParticipants from "@/components/list/ListParticipants";

import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { Party } from "@/interfaces/party.interface";

import React from "react";
import Cover from "./CardInfos/Cover";
import Infos from "./CardInfos/Infos";
import Author from "./CardInfos/Author";

export default function UnjoinedParty({ party }: { party: Party }) {
  return (
    <div>
      <div className="bg-white rounded-lg flex  gap-x-14 px-10 py-8">
        <Cover party={party} />
        <Infos party={party} />
        <Author party={party} />
      </div>
      <div className="flex justify-center pt-5">
        <ButtonPrimary color="primary-500" label="Rejoindre la partie" />
      </div>
      <div className="py-3">
        <h2>
          {party.participants.length > 0
            ? `${party.participants.length + 1} participants`
            : `${party.participants.length + 1} participant`}
        </h2>
        <ListParticipants
          participants={[party.author, ...party.participants]}
        />
      </div>
      <div>
        <h2>Jeux proposés</h2>
        <ListGames games={party.games} />
      </div>
    </div>
  );
}
