import Image from "next/image";
import React from "react";
import GameTag from "../tag/GameTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCity,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { PartyCard } from "@/interfaces/party.interface";
import Link from "next/link";

export default function CardParty({ party }: { party: PartyCard }) {
  return (
    <Link href={`/parties/${party.id}`}>
      <div className="flex bg-white rounded-lg p-3 w-full">
        <div className="h-28 relative w-full max-w-36 ">
          {party.games[0] && (
            <Image
              alt="test"
              src={`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${party.games[0].cover?.filepath}`}
              fill
              className="object-contain"
            />
          )}
        </div>
        <div className="flex  justify-around flex-col">
          <h2>{party.title}</h2>
          <div className="flex gap-x-3 ">
            {party.games &&
              party.games.map((game) => (
                <GameTag game={game} key={`${party.id}tag${game.id}`} />
              ))}
          </div>
          <div className="flex gap-x-16">
            <div className="flex gap-x-2 items-center">
              <FontAwesomeIcon icon={faUserGroup} />
              {party.participants}/{party.capacity}
            </div>
            <div className="flex gap-x-2 items-center">
              <FontAwesomeIcon icon={faCity} />
              {party.city.name}
            </div>

            <div className="flex gap-x-2 items-center">
              <FontAwesomeIcon icon={faCalendarCheck} />
              21/08/2024
            </div>
          </div>
        </div>
        <div className=" w-full flex justify-end items-center">
          <div className=" me-10">
            <div className="h-12 relative w-full max-w-36  ">
              <Image
                alt="test"
                src={`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/images/users/4/pngwing-com-679f870e30a42280699838.png`}
                fill
                className="object-contain"
              />
            </div>
            <p>{party.author.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
