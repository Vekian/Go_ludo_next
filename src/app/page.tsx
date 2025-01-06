import MainContent from "./MainContent";
import Filters from "./Filters";
import CardGame from "@/components/card/CardGame";

export default function Home() {
  return (
    <main>
      <div className="bg-white ">
        <div className="container pt-10 pb-5 ">
          <MainContent />
          <Filters />
        </div>
      </div>

      <div>
        <div className="container flex justify-center flex-wrap">
          <CardGame />
          <CardGame />
        </div>
      </div>
    </main>
  );
}
