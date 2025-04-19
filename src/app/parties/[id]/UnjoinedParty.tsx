import ListGames from "@/components/list/ListGames";
import ListParticipants from "@/components/list/ListParticipants";

import { Party } from "@/interfaces/party.interface";

import React from "react";
import Cover from "./CardInfos/Cover";
import Infos from "./CardInfos/Infos";
import UserInfos from "./CardInfos/UserInfos";
import ButtonJoin from "./CardInfos/ButtonJoin";

export default function UnjoinedParty({ party }: { party: Party }) {
  return (
    <div>
      <div className="bg-white rounded-lg flex  gap-x-14 px-10 py-8">
        <Cover party={party} />
        <Infos party={party} />
        <UserInfos user={party.author} />
      </div>
      <ButtonJoin party={party} />
      <div className="py-3">
        <h2>
          {party.participants.length > 0
            ? `${party.participants.length + 1} participants`
            : `${party.participants.length + 1} participant`}
        </h2>
        <ListParticipants
          participants={party.participants}
          author={party.author}
        />
      </div>
      <div>
        <h2>Jeux proposés</h2>
        <ListGames games={party.games} />
      </div>
    </div>
  );
}
