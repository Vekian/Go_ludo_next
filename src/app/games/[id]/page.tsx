import React from "react";
import Carousel from "@/components/carousel/Carousel";
import Rating from "@/components/rating/Rating";
import GameInfos from "./GameInfos";
import GameContent from "./GameContent";
import GameTech from "./GameTech";
import GameStats from "./GameStats";
import GameAbout from "./GameAbout";
import CardGame from "@/components/card/CardGame";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import Review from "@/components/card/Review";
import ButtonSecondary from "@/components/button/ButtonSecondary";

interface Params {
  id: string; // Vous pouvez ajuster le type en fonction de vos besoins
}
function page({ params }: { params: Params }) {
  const imgs: [] = [
    {
      id: 2,
      src: "/images/game_cover.png",
      alt: "banniere",
    },
    {
      id: 3,
      src: "/images/game_cover.png",
      alt: "banniere",
    },
  ];

  return (
    <div className="p-4 pt-10">
      <div className="flex bg-white rounded-lg">
        <div className="w-1/3 pt-5">
          <Carousel
            autoPlay={false}
            imgs={imgs}
            thumbs={true}
            height={300}
            width={200}
          />
        </div>
        <div className=" w-2/3 p-5">
          <div className="flex justify-between items-start p-5">
            <h2>Duel pour la terre du milieu</h2>
            <Rating value={4} />
          </div>
          <GameContent>
            <GameInfos />
            <GameTech />
            <GameStats />
            <GameAbout />
          </GameContent>
        </div>
      </div>
      <div className="bg-white rounded-lg mt-4 p-10">
        <h2>Description</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          accusamus sapiente ducimus nobis aliquid dicta quidem magnam repellat
          dolor labore qui facere delectus maiores enim vel in iure beatae
          placeat quibusdam praesentium eius, dolorum maxime. Magni vel tenetur
          omnis laudantium modi eaque, eos obcaecati at quasi, ipsa dicta ullam
          error neque numquam voluptatum maiores aliquam facilis quaerat nihil
          qui. Eum blanditiis fuga aliquid! Voluptate odio error iste, ut
          nostrum dolor nisi at, deserunt, libero nihil voluptatem suscipit
          ipsum alias. Quis ipsa reprehenderit fugiat ducimus quod. Doloremque,
          vel. Sapiente nam sequi exercitationem dolorum illo veritatis nemo non
          omnis ut, eligendi aspernatur adipisci quos perferendis eum quasi,
          eaque consectetur, magni temporibus dolore assumenda tenetur?
          Consequatur molestias quia ullam non culpa, veritatis ut quidem
          dolorem velit officia architecto molestiae unde est voluptatibus, iure
          deserunt voluptas laborum illum temporibus iste aliquid fuga! Harum
          distinctio quod voluptates, laboriosam aut dolore dolorum sit ab
          facere itaque!
        </p>
      </div>
      <div className="mt-4 pl-10 pr-10">
        <div className="flex items-center ">
          <div className="flex flex-1">
            <h3>5 avis</h3>
            <h3 className="ml-4">14 commentaires</h3>
          </div>
          <div className="flex flex-2 items-center">
            <ButtonPrimary label="Ajouter un avis" color="primary-500" />
            <div className="ml-20">
              <Rating />
            </div>
          </div>
        </div>
        <Review />
        <div className="flex justify-center p-5">
          <ButtonSecondary
            label="Voir plus de commentaires"
            color="primary-800"
          />
        </div>
      </div>
      <div className="mt-4 pl-10 pr-10">
        <h2>Jeux similaires</h2>
        <div className="flex">
          <CardGame />
          <CardGame />
        </div>
      </div>
    </div>
  );
}

export default page;
