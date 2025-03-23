import MainContent from "./MainContent";
import GamesList from "./GamesList";
import { Suspense } from "react";
import CategoryFilter from "@/components/ui/filter/gameFilter/CategoryFilter";
import ThemeFilter from "@/components/ui/filter/gameFilter/ThemeFilter";
import ModeFilter from "@/components/ui/filter/gameFilter/ModeFilter";
import SortFilter from "@/components/ui/filter/gameFilter/SortFilter";
import TimeFilter from "@/components/ui/filter/gameFilter/TimeFilter";
import TabsCustom from "../components/ui/tab/TabsCustom";
import CustomLinearProgress from "@/components/ui/loader/CustomLoader";
import CustomCircularLoader from "@/components/ui/loader/CustomCircularLoader";

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
        <div className="container pt-10 pb-5 ">
          <MainContent />

          <TabsCustom>
            <SortFilter />
            <Suspense fallback={<CustomCircularLoader />}>
              <div className="w-36">
                <CategoryFilter />
              </div>
            </Suspense>
            <Suspense fallback={<CustomCircularLoader />}>
              <div className="w-40">
                <ThemeFilter />
              </div>
            </Suspense>
            <Suspense fallback={<CustomCircularLoader />}>
              <div className="w-44">
                <ModeFilter />
              </div>
            </Suspense>

            <TimeFilter />
          </TabsCustom>
        </div>
      </div>
      <div>
        <Suspense fallback={<CustomLinearProgress />}>
          <GamesList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
