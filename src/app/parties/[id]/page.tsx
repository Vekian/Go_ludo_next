import ListGames from "@/components/list/ListGames";
import ListParticipants from "@/components/list/ListParticipants";
import GameTag from "@/components/tag/GameTag";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { Party } from "@/interfaces/party.interface";
import { getParty } from "@/lib/api/api";
import { formatDate } from "@/lib/date";
import {
  faCalendarCheck,
  faCity,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page({ params }: { params: { id: number } }) {
  const id = (await params).id;
  const party: Party = await getParty(id);

  return (
    <div className="p-10">
      <div className="bg-white rounded-lg flex  gap-x-14 px-10 py-8">
        <div className="flex justify-center w-1/6">
          <div className="h-56 relative w-full max-w-36 ">
            {party.games[0] && (
              <Image
                alt="test"
                src={`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${party.games[0].cover?.filepath}`}
                fill
                className="object-contain"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-y-3">
            <h1>{party.title}</h1>
            <div className="flex gap-x-16">
              <div className="flex gap-x-2 items-center">
                <FontAwesomeIcon icon={faCity} />
                <p>{party.city.name}</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <FontAwesomeIcon icon={faCalendarCheck} />
                <p>{formatDate(party.closedAt)}</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <FontAwesomeIcon icon={faUserGroup} />
                <p>
                  {party.participants.length}/{party.capacity}
                </p>
              </div>
            </div>
            <div>{party.description}</div>
          </div>
          <div className="flex gap-x-3">
            {party.games &&
              party.games.map((game) => (
                <Link
                  href={`/${game.type === "base" ? "game" : game.type}s/${
                    game.id
                  }`}
                  key={`${party.id}tag${game.id}`}
                >
                  <GameTag game={game} />
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-5">
        <ButtonPrimary color="primary-500" label="Rejoindre la partie" />
      </div>
      <div className="py-3">
        <h2>
          {party.participants.length > 1
            ? `${party.participants.length} participants`
            : `${party.participants.length} participant`}
        </h2>
        <ListParticipants participants={party.participants} />
      </div>
      <div>
        <h2>Jeux proposés</h2>
        <ListGames games={party.games} />
      </div>
    </div>
  );
}
