import React from "react";

import { getCategories } from "@/lib/api/server/category";
import Form from "./Form/Form";
import SortParties from "./SortParties";
import ListParties from "@/components/list/ListParties";
import { searchParties } from "@/lib/api/server/party";
import { ListPaginated } from "@/interfaces/paginator.interface";
import { PartyCard } from "@/interfaces/party.interface";
import { getCity } from "@/lib/api/server/city";
import { getGameItem } from "@/lib/api/server/game";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const partiesData = await searchParties(params);
  const cityData = await getCity(Number(params.city));
  const gameData = await getGameItem(
    Number(params?.game ? params.game : params.extension)
  );

  let parties: ListPaginated<PartyCard> | undefined = undefined;

  if (partiesData.ok) {
    parties = partiesData.data;
  }

  const [categories, modes, themes] = await Promise.all([
    getCategories("category"),
    getCategories("mode"),
    getCategories("theme"),
  ]);

  if (!categories.data || !modes.data || !themes.data) {
    throw new Error("Categories, modes or themes not found");
  }

  return (
    <main>
      <div>
        <Form
          categories={categories.data}
          themes={themes.data}
          modes={modes.data}
          params={params}
          city={cityData?.data ?? null}
          game={gameData?.data ?? null}
        />
        {parties && (
          <div className="lg:p-10 p-3 flex-col gap-y-3 flex">
            <div className="bg-white rounded-lg p-3 mb-6 py-6">
              <div className="text-center">
                {Object.entries(params).length === 0 ? (
                  <h3>
                    On est sympa, on vous a trouvé des parties qui pourraient
                    peut-être vous intéresser !
                  </h3>
                ) : (
                  <>
                    <h3>Voici ce qu&apos;on a trouvé</h3>
                    <h6>
                      N&apos;hésitez pas à rajouter des critères de recherche
                      pour trouver la partie de vos rêves. <br /> Vous pouvez
                      aussi trier par pertinence ou par distance, c&apos;est
                      vous qui voyez.
                    </h6>
                  </>
                )}
              </div>
            </div>
            <div className="ml-6">
              <SortParties countParties={parties.totalResults} />
            </div>
            <ListParties parties={parties} />
          </div>
        )}
      </div>
    </main>
  );
}
