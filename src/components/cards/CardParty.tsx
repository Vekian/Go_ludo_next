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
import { Avatar } from "@mui/material";
import { getImg } from "@/lib/utils";
import { formatDate } from "@/lib/date";

export default function CardParty({ party }: { party: PartyCard }) {
  return (
    <Link href={`/parties/${party.id}`}>
      <div className="flex justify-between px-6 bg-white rounded-lg p-3 w-full gap-x-6">
        <div className="flex items-center h-full gap-x-6">
          <div className="h-28 relative  w-32 ">
            {party.games[0] && (
              <Image
                alt="test"
                src={`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}${party.games[0].cover}`}
                fill
                className="object-contain"
              />
            )}
          </div>
          <div className="flex justify-around flex-col gap-y-2.5">
            <h2>{party.title}</h2>
            <div className="flex flex-wrap gap-y-2 gap-x-3 ">
              {party.games &&
                party.games.map((game) => (
                  <GameTag game={game} key={`${party.id}tag${game.id}`} />
                ))}
            </div>
            <div className="w-full flex flex-wrap gap-x-16">
              <div className="flex gap-x-2 items-center">
                <FontAwesomeIcon
                  icon={faUserGroup}
                  className="text-primary-950"
                />
                {party.participants + 1}/{party.playersMax}
              </div>
              <div className="flex gap-x-2 items-center">
                <FontAwesomeIcon icon={faCity} className="text-primary-950" />
                {party.city.name}
              </div>

              <div className="flex gap-x-2 items-center">
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  className="text-primary-950"
                />
                {formatDate(party.meetingDate)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center">
          <div className="flex flex-col items-center gap-y-2 xl:me-10 min-w-44">
            <div className="h-12  w-full flex justify-center  ">
              <Avatar
                alt={party.author.username}
                src={getImg(party.author.avatar)}
                sx={{ width: 56, height: 56 }}
              />
            </div>
            <p>{party.author.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
