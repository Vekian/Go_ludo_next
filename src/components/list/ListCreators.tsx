import { GameCreator } from "@/interfaces";
import CardCreator from "../cards/CardCreator";

export default function ListCreators({
  creators,
  title,
}: {
  creators: GameCreator[];
  title: string;
}) {
  return (
    <div className="flex flex-col">
      <h4>{title}</h4>
      <div className="flex mt-2 gap-x-3">
        {creators.map((gameCreator) => (
          <CardCreator
            creator={gameCreator.creator}
            key={gameCreator.creator.id}
          />
        ))}
      </div>
    </div>
  );
}
