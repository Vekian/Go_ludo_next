"use client";
import { Message, Party } from "@/interfaces/party.interface";
import React, { useEffect, useState } from "react";
import Infos from "./CardInfos/Infos";
import UserInfos from "./CardInfos/UserInfos";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import CardGame from "@/components/cards/CardGame";
import { GameListItem } from "@/interfaces";
import { theme } from "@/theme/theme";
import Chat from "./Chat/Chat";
import ButtonLeave from "./CardInfos/ButtonLeave";
import TabsCustom from "@/components/ui/tab/TabsCustom";
import CardParticipant from "@/components/cards/CardParticipant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCommentDots,
  faPen,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { ChatMessageNotification } from "@/interfaces/notification.interface";
import { useMercureSubscription } from "@/hook/UseMercureSubscription";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function PendingParty({ party }: { party: Party }) {
  const [mobileChat, setMobileChat] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<Message[]>(party.messages ?? []);
  const participants = [party.author, ...party.participants];
  const { data } = useSession();

  useMercureSubscription({
    topic: `/party/${party.id}/messages`,
    refreshUrl: `/api/party/token/${party.id}`,
    onMessage: (notif: object) => {
      const notification = notif as ChatMessageNotification;
      setMessages((prevMessages) => {
        if (notification.action === "create") {
          return [...prevMessages, notification.message];
        } else if (notification.action === "update") {
          return prevMessages.map((m) =>
            m.id === notification.message.id ? notification.message : m
          );
        } else if (notification.action === "delete") {
          return prevMessages.filter((m) => m.id !== notification.message.id);
        } else {
          return prevMessages;
        }
      });
    },
  });

  useEffect(() => {
    // Fonction pour vérifier la largeur de l'écran
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();

    // Ajouter le listener
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex lg:flex-nowrap flex-wrap h-full gap-x-6 lg:mt-0 -mt-3 gap-y-3">
      <div
        className={`w-full lg:w-1/2 ${
          !isMobile && !mobileChat && "h-1/5"
        }  2xl:w-1/3 flex overflow-scroll flex-col gap-y-3`}
      >
        {isMobile && mobileChat ? (
          <div
            className="w-full cursor-pointer"
            onClick={() => setMobileChat(!mobileChat)}
          >
            <div className="bg-white rounded-lg flex flex-wrap justify-between  gap-x-14 px-6 sm:px-12 lg:px-5 py-8 ">
              <p>{party.title}</p>
              <div className="flex gap-x-2 items-center">
                <FontAwesomeIcon
                  icon={faUserGroup}
                  className="text-primary-950"
                />
                <p>
                  {party.participants.length + 1}/{party.playersMax}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col items-center">
              <div className="bg-white rounded-full px-5 py-2 -mt-6">
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg flex flex-wrap justify-center  gap-x-14 px-5 py-8">
            <div className="flex w-full justify-around relative">
              <UserInfos user={party.author} />
              {data &&
                (data.user.roles.includes("ROLE_ADMIN") ||
                  party.author.id === Number(data.user.id)) && (
                  <div className="absolute right-0">
                    <Link href={`/parties/edit/${party.id}`}>
                      <ButtonPrimary
                        label=""
                        icon={faPen}
                        color={theme.colors.primary[600]}
                      />
                    </Link>
                  </div>
                )}
            </div>
            <Infos party={party} />
          </div>
        )}

        <div className="flex justify-around items-center">
          <ButtonLeave party={party} />
        </div>
        {isMobile && mobileChat ? (
          <></>
        ) : (
          <>
            <div>
              <h3>Participants :</h3>
              <TabsCustom
                scrollable={isMobile ? false : "auto"}
                classChild="pt-2"
              >
                {participants.map((participant) => (
                  <CardParticipant
                    participant={participant}
                    key={`participant${participant.id}`}
                    party={party}
                  />
                ))}
              </TabsCustom>
            </div>
            <div className=" w-full">
              <h3>Jeux proposés :</h3>
              <TabsCustom
                scrollable={isMobile ? false : "auto"}
                classChild="pt-2"
              >
                {party.games.map((game: GameListItem) => (
                  <div key={`${game.id}list`} className="w-48">
                    <CardGame game={game} logged={true} />
                  </div>
                ))}
              </TabsCustom>
            </div>
          </>
        )}
      </div>
      {isMobile && !mobileChat ? (
        <div
          className="absolute right-16 bottom-16 cursor-pointer"
          onClick={() => setMobileChat(!mobileChat)}
        >
          <ButtonPrimary
            icon={faCommentDots}
            label="Discutez"
            color={theme.colors.primary[900]}
            onClick={() => {
              setMobileChat(!mobileChat);
            }}
          />
        </div>
      ) : (
        <div
          className={`${
            isMobile && mobileChat ? "h-4/5" : "h-full"
          } w-full lg:w-1/2 2xl:w-2/3`}
        >
          <Chat party={party} messages={messages ?? []} />
        </div>
      )}
    </div>
  );
}
