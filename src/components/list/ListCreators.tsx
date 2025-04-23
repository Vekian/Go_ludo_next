import { Creator } from "@/interfaces";
import CardCreator from "../cards/CardCreator";

export default function ListCreators({
  creators,
  title,
}: {
  creators: Creator[];
  title: string;
}) {
  return (
    <div className="flex flex-col flex-1">
      <h4>{title}</h4>
      <div className="flex mt-2">
        {creators.map((creator) => (
          <CardCreator creator={creator} key={creator.id} />
        ))}
      </div>
    </div>
  );
}
