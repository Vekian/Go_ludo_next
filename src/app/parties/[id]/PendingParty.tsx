"use client";
import { Message, Party } from "@/interfaces/party.interface";
import React, { useEffect, useRef, useState } from "react";
import Infos from "./CardInfos/Infos";
import UserInfos from "./CardInfos/UserInfos";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import ListParticipants from "@/components/list/ListParticipants";
import CardGame from "@/components/cards/CardGame";
import { GameListItem } from "@/interfaces";
import Chat from "./Chat/Chat";
import InputChat from "./Chat/InputChat";
import { theme } from "@/theme/theme";

export default function PendingParty({ party }: { party: Party }) {
  const [messages, setMessages] = useState<Message[] | undefined>(
    party.messages
  );
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scrolle en bas à chaque mise à jour des messages
    if (chatEndRef?.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const addMessage = (message: Message) => {
    if (messages) {
      setMessages([...messages, message]);
    } else {
      setMessages([message]);
    }
  };
  return (
    <div className="flex h-full gap-x-6">
      <div className="w-1/3 flex overflow-scroll flex-col gap-y-3">
        <div className="bg-white rounded-lg flex flex-wrap justify-center  gap-x-14 px-5 py-8">
          <div className="flex w-full justify-around">
            <UserInfos user={party.author} />
          </div>
          <Infos party={party} />
        </div>
        <div className="flex justify-around items-center">
          <ButtonPrimary
            label="Inviter un ami"
            color={theme.colors.primary[600]}
          />
          <ButtonSecondary
            label="Quitter le groupe"
            color={theme.colors.primary[800]}
          />
        </div>
        <div>
          <h3>Participants :</h3>
          <ListParticipants participants={party.participants} />
        </div>
        <div className=" w-full">
          <h3>Jeux proposés :</h3>
          <div className="flex  gap-5 mt-5">
            {party.games.map((game: GameListItem) => (
              <CardGame game={game} key={`${game.id}list`} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-2/3 gap-y-6">
        <div className="bg-white rounded-lg h-4/5 overflow-y-scroll">
          <Chat messages={messages} />
          <div ref={chatEndRef} />
        </div>
        <div className="bg-white rounded-lg h-1/5">
          <InputChat party={party} addMessage={addMessage} />
        </div>
      </div>
    </div>
  );
}
