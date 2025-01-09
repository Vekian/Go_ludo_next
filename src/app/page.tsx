import MainContent from "./MainContent";
import Filters from "./Filters";
import GamesList from "./GamesList";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category: string | string[] }>;
}) {
  return (
    <main>
      <div className="bg-white ">
        <div className="container pt-10 pb-5 ">
          <MainContent />
          <Filters />
        </div>
      </div>
      <div>
        <Suspense fallback={<p>Chargement ...</p>}>
          <GamesList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
