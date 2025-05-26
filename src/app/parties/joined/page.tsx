import { ListPaginated } from "@/interfaces/paginator.interface";
import { PartyCard } from "@/interfaces/party.interface";
import { findPartiesByStatus } from "@/lib/api/server/party";
import React from "react";
import ListParties from "@/components/list/ListParties";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const partiesData = await findPartiesByStatus("joined", params.page);

  let parties: ListPaginated<PartyCard> | undefined = undefined;

  if (partiesData.ok) {
    parties = partiesData.data;
  }
  return (
    <div className="p-3 flex flex-col gap-y-3">
      <div className="bg-white rounded-lg p-3 flex flex-col items-center justify-center">
        <h2 className="text-2xl  mb-4">Parties en cours</h2>
        <p>Vous trouverez toutes vos parties en cours ici.</p>
      </div>
      {parties && (
        <div>
          <div className="ml-6">
            <div className="flex gap-x-3 items-center">
              <h3>
                {parties.items.length > 1
                  ? `${parties.items.length} parties en cours`
                  : `${parties.items.length} partie en cours`}
              </h3>
            </div>
          </div>
          <ListParties parties={parties} />
        </div>
      )}{" "}
    </div>
  );
}
