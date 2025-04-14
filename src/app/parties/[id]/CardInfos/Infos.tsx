import { Party } from "@/interfaces/party.interface";
import React from "react";
import {
  faCalendarCheck,
  faCity,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import GameTag from "@/components/tag/GameTag";
import { formatDate } from "@/lib/date";

export default function Infos({ party }: { party: Party }) {
  return (
    <div className="flex justify-between w-5/6">
      <div className="flex flex-col justify-between gap-y-3">
        <div className="flex flex-col gap-y-3">
          <h1>{party.title}</h1>
          <div className="flex gap-x-16">
            <div className="flex gap-x-2 items-center">
              <FontAwesomeIcon icon={faCity} />
              <p>{party.city.name}</p>
            </div>
            <div className="flex gap-x-2 items-center">
              <FontAwesomeIcon icon={faUserGroup} />
              <p>
                {party.participants.length + 1}/{party.playersMax}
              </p>
            </div>
          </div>
          <div className="flex gap-x-16">
            <div className="flex gap-x-2 items-center">
              <FontAwesomeIcon icon={faCalendarCheck} />
              <p>{formatDate(party.meetingDate)}</p>
            </div>
          </div>
          <div>{party.description}</div>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
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
  );
}
