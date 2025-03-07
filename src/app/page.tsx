import MainContent from "./MainContent";
import GamesList from "./GamesList";
import { Suspense } from "react";
import CategoryFilter from "@/components/ui/filter/gameFilter/CategoryFilter";
import ThemeFilter from "@/components/ui/filter/gameFilter/ThemeFilter";
import ModeFilter from "@/components/ui/filter/gameFilter/ModeFilter";
import SortFilter from "@/components/ui/filter/gameFilter/SortFilter";
import TimeFilter from "@/components/ui/filter/gameFilter/TimeFilter";
import TabsCustom from "../components/ui/tab/TabsCustom";

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
            <TabsCustom>
              <SortFilter />
              <div className="w-36">
                <CategoryFilter />
              </div>
              <div className="w-40">
                <ThemeFilter />
              </div>
              <div className="w-44">
                <ModeFilter />
              </div>

              <TimeFilter />
            </TabsCustom>
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
