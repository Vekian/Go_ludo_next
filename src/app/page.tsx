import MainContent from "./components/MainContent";
import GamesList from "./components/GamesList";
import { Suspense } from "react";
import CategoryFilter from "@/components/ui/filter/gameFilter/CategoryFilter";
import ThemeFilter from "@/components/ui/filter/gameFilter/ThemeFilter";
import ModeFilter from "@/components/ui/filter/gameFilter/ModeFilter";
import SortFilter from "@/components/ui/filter/gameFilter/SortFilter";
import TimeFilter from "@/components/ui/filter/gameFilter/TimeFilter";
import TabsCustom from "../components/ui/tab/TabsCustom";
import CustomLinearProgress from "@/components/ui/loader/CustomLoader";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    category: string | string[];
    theme: string | string[];
    mode: string | string[];
    sort: string;
    time: string;
    page: string;
  }>;
}) {
  return (
    <main>
      <div className="bg-white ">
        <div className="container pt-10 pb-2 ">
          <MainContent />

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
        </div>
      </div>
      <div className="px-1 md:px-6">
        <Suspense fallback={<CustomLinearProgress />}>
          <GamesList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
