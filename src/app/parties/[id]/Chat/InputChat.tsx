"use client";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import TextAreaAutosize from "@/components/ui/input/TextAreaAutosize";
import { Message, Party } from "@/interfaces/party.interface";
import { sendMessage } from "@/lib/api/server/chat";
import { theme } from "@/theme/theme";
import React, { useState } from "react";

export default function InputChat({
  party,
  addMessage,
}: {
  party: Party;
  addMessage: (message: Message) => void;
}) {
  const [value, setValue] = useState<string>();

  const handleSubmit = async () => {
    const response = await sendMessage(value as string, party.id);
    if (!response.ok) {
    }
    if (response.data) {
      addMessage(response.data);
      setValue("");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-full px-6 gap-y-3">
      <div className="overflow-y-scroll w-full">
        <TextAreaAutosize
          minRows={1}
          className="w-full  overflow-y-scroll"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </div>

      <ButtonPrimary
        label="Envoyer"
        color={theme.colors.primary[600]}
        onClick={handleSubmit}
      />
    </div>
  );
}
