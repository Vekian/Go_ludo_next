"use client";
import React, { useEffect, useState } from "react";
import Form from "./Form/Form";
import ListParties from "@/components/list/ListParties";
import { GameCategory } from "@/interfaces";
import { PartyCard } from "@/interfaces/party.interface";
import { searchParties } from "@/lib/api/server/party";

export default function Main({
  categories,
  themes,
  modes,
  params,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
  params?: Record<string, string | undefined>;
}) {
  const [parties, setParties] = useState<PartyCard[] | null>(null);

  useEffect(() => {
    fetchParties();
  }, [parties, params]);

  async function fetchParties() {
    if (!parties) {
      const formData = new FormData();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, value);
          }
        });
      }

      const response = await searchParties(formData);
      if (response.ok) {
        setParties(response.data);
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
