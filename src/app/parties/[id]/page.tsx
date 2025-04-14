import { Party } from "@/interfaces/party.interface";
import { getParty } from "@/lib/api/server/party";
import React from "react";
import UnjoinedParty from "./UnjoinedParty";
import PendingParty from "./PendingParty";

export default async function page({ params }: { params: { id: number } }) {
  const id = (await params).id;
  const party: Party = await getParty(id);

  return (
    <div className="p-2 pt-5 lg:p-10 pb-4 h-full">
      {party.joined ? (
        <PendingParty party={party} />
      ) : (
        <UnjoinedParty party={party} />
      )}
    </div>
  );
}
