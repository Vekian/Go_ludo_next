"use client";
import React, { useEffect, useState } from "react";
import Form from "./Form/Form";
import ListParties from "@/components/list/ListParties";
import { GameCategory } from "@/interfaces";
import { PartyCard } from "@/interfaces/party.interface";
import { getParties } from "@/lib/api/api";

export default function Main({
  categories,
  themes,
  modes,
  params,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
  params?: unknown;
}) {
  const [parties, setParties] = useState<PartyCard[] | null>(null);

  useEffect(() => {
    fetchParties();
  }, [parties, params]);

  async function fetchParties() {
    if (!parties) {
      const data = await getParties(params);
      if (data) {
        setParties(data);
      }
    }
  }

  return (
    <div>
      <Form
        categories={categories}
        themes={themes}
        modes={modes}
        setParties={setParties}
      />
      {parties && <ListParties parties={parties} />}
    </div>
  );
}
