import React from "react";
import { PartyCard } from "@/interfaces/party.interface";
import CardParty from "../cards/CardParty";

function ListParties({ parties }: { parties: PartyCard[] }) {
  return (
    <div className="p-10">
      <h3>
        {parties.length > 1
          ? `${parties.length} parties trouvées`
          : `${parties.length} partie trouvée`}
      </h3>
      <div className=" flex flex-col gap-5 mt-5">
        {parties.map((party) => (
          <CardParty party={party} key={party.id} />
        ))}
      </div>
    </div>
  );
}

export default ListParties;
