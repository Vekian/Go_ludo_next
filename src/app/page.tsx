import MainContent from "./MainContent";
import Filters from "../components/ui/filter/gameFilter/Filters";
import GamesList from "./GamesList";
import { Suspense } from "react";
import CategoryFilter from "@/components/ui/filter/gameFilter/CategoryFilter";
import ThemeFilter from "@/components/ui/filter/gameFilter/ThemeFilter";
import ModeFilter from "@/components/ui/filter/gameFilter/ModeFilter";
import SortFilter from "@/components/ui/filter/gameFilter/SortFilter";
import TimeFilter from "@/components/ui/filter/gameFilter/TimeFilter";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    category: string | string[];
    theme: string | string[];
    mode: string | string[];
  }>;
}) {
  return (
    <main>
      <div className="bg-white ">
        <div className="container pt-10 pb-5 ">
          <MainContent />
          <Suspense fallback={<p>Chargement ...</p>}>
            <Filters>
              <SortFilter />
              <CategoryFilter />
              <ThemeFilter />
              <ModeFilter />
              <TimeFilter />
            </Filters>
          </Suspense>
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
