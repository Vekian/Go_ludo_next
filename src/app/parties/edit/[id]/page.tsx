import { getCategories } from "@/lib/api/server/category";
import { getGameItem } from "@/lib/api/server/game";
import React from "react";
import Form from "../../create/Form";
import { getParty } from "@/lib/api/server/party";
import { Party } from "@/interfaces/party.interface";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const [categories, modes, themes] = await Promise.all([
    getCategories("category"),
    getCategories("mode"),
    getCategories("theme"),
  ]);
  const searchParamsValues = await searchParams;
  const { id } = await params;
  const party: Party = await getParty(id);

  const gameData = await getGameItem(
    Number(
      searchParamsValues?.game
        ? searchParamsValues.game
        : searchParamsValues.extension
    )
  );

  if (!categories.data || !modes.data || !themes.data) {
    throw new Error("Categories, modes or themes not found");
  }

  return (
    <div className="h-full w-full p-2 lg:p-4 flex flex-col items-center gap-y-5">
      <div className="bg-white rounded-lg px-6 lg:px-12 py-6 text-center flex flex-col items-center gap-y-4">
        <h1>Édition de partie</h1>
      </div>
      <Form
        categories={categories.data}
        themes={themes.data}
        modes={modes.data}
        game={gameData?.data ?? null}
        party={party}
      />
    </div>
  );
}
