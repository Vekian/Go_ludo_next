"use client";
import React, { useEffect, useState } from "react";
import Form from "./Form/Form";
import ListParties from "@/components/list/ListParties";
import { GameCategory } from "@/interfaces";
import { PartyCard } from "@/interfaces/party.interface";

export default function Main({
  categories,
  themes,
  modes,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
}) {
  const [parties, setParties] = useState<PartyCard[] | null>(null);

  useEffect(() => {
    if (!parties) {
      fetchParties();
    }
  }, [parties]);

  async function fetchParties() {
    const response = await fetch("/api/party", {
      body: JSON.stringify({ tets: "eed" }),
      method: "POST",
    });
    if (response.ok) {
      const parties = await response.json();
      setParties(parties);
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
