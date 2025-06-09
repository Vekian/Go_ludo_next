"use client";
import React from "react";
import { PartyCard } from "@/interfaces/party.interface";
import CardParty from "../cards/CardParty";
import { ListPaginated } from "@/interfaces/paginator.interface";
import NumberPaginator from "./pagination/NumberPaginator";
import { useRouter, useSearchParams } from "next/navigation";

function ListParties({ parties }: { parties: ListPaginated<PartyCard> }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/parties?${params.toString()}`, { scroll: false });
  };
  return (
    <div>
      <div className=" flex flex-col gap-5 mt-5">
        {parties.items &&
          parties.items.map((party) => (
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
