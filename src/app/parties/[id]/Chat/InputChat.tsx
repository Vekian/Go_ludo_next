"use client";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import TextAreaAutosize from "@/components/ui/input/TextAreaAutosize";
import { Message, Party } from "@/interfaces/party.interface";
import { sendMessage } from "@/lib/api/api";
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
    const body = {
      party: party.id,
      content: value,
    };
    const message = await sendMessage(body);
    if (message) {
      addMessage(message);
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
