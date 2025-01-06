import MainContent from "./MainContent";
import Filters from "./Filters";
import CardGame from "@/components/card/CardGame";

export default function Home() {
  return (
    <main className=" bg-neutral-50 min-h-screen">
      <div className="bg-white ">
        <div className="container pt-10 pb-5 ">
          <MainContent />
          <Filters />
        </div>
      </div>

      <div>
        <div className="container flex">
          <CardGame />
          <CardGame />
        </div>
      </div>
    </main>
  );
}
