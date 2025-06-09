import Image from "next/image";
import React from "react";
import GameTag from "../tag/GameTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChartSimple,
  faCity,
  faShoePrints,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { PartyCard } from "@/interfaces/party.interface";
import Link from "next/link";
import { Avatar, Tooltip } from "@mui/material";
import { getImg } from "@/lib/utils";
import { formatDate } from "@/lib/date";

export default function CardParty({ party }: { party: PartyCard }) {
  return (
    <Link href={`/parties/${party.id}`}>
      <div className="flex justify-between px-2 sm:px-6 bg-white hover:bg-secondary-50 rounded-lg p-3 w-full gap-x-6">
        <div className="flex items-center h-full gap-x-6 sm:w-auto w-8/12">
          <div className="h-28 relative  w-32 min-w-16 ">
            {party.games[0] && (
              <Image
                alt="test"
                src={getImg(party.games[0].cover)}
                fill
                sizes="128px"
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

        <div className="flex justify-end items-center sm:w-auto w-2/12">
          <div className="flex flex-col items-center gap-y-2 xl:me-10 min-w-24 sm:h-auto h-full">
            <div className="h-12  w-full flex justify-center  ">
              <Avatar
                alt={party.author.username}
                src={getImg(party.author.avatar)}
                sx={{ width: 56, height: 56 }}
              />
            </div>
            <p>{party.author.username}</p>
            {party.score && (
              <Tooltip placement="bottom" title="Score de pertinence">
                <div className="flex items-center">
                  <p>{party.score}</p>
                  <FontAwesomeIcon
                    icon={faChartSimple}
                    className={`ms-1 ${
                      party.score > 75
                        ? "text-secondary-600"
                        : "text-primary-700"
                    }`}
                  />
                </div>
              </Tooltip>
            )}
            {party.distance !== null && (
              <Tooltip
                placement="bottom"
                title="Distance calculée par rapport à la ville de référence"
              >
                <div className="flex items-center">
                  <p>{party.distance} km</p>
                  <FontAwesomeIcon icon={faShoePrints} className="ms-1 " />
                </div>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
