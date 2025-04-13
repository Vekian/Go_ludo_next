"use client";
import React from "react";
import { PartyCard } from "@/interfaces/party.interface";
import CardParty from "../cards/CardParty";
import { ListPaginated } from "@/interfaces/paginator.interface";
import NumberPaginator from "./pagination/NumberPaginator";

function ListParties({
  parties,
  handlePagination,
}: {
  parties: ListPaginated<PartyCard>;
  handlePagination: (page: number) => void;
}) {
  return (
    <div className="lg:p-10 p-3 flex-col gap-y-3 flex">
      <h3>
        {parties.totalResults > 1
          ? `${parties.totalResults} parties trouvées`
          : `${parties.totalResults} partie trouvée`}
      </h3>
      <div className=" flex flex-col gap-5 mt-5">
        {parties.items.map((party) => (
          <CardParty party={party} key={party.id} />
        ))}
      </div>
      <NumberPaginator
        page={parties.page}
        totalPages={parties.totalPages}
        handlePagination={handlePagination}
      />
    </div>
  );
}

export default ListParties;
