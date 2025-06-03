"use client";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import TextAreaAutosize from "@/components/ui/input/TextAreaAutosize";
import { Party } from "@/interfaces/party.interface";
import { sendMessage } from "@/lib/api/server/chat";
import { theme } from "@/theme/theme";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";

export default function InputChat({ party }: { party: Party }) {
  const [value, setValue] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<
    Record<string, string[] | undefined> | undefined
  >();

  const handleSubmit = async () => {
    setLoading(true);
    const response = await sendMessage(value ?? "", party.id);

    if (!response.ok) {
      if (response.errors) {
        setErrors(response.errors);
      }
    }
    if (response.data) {
      setValue("");
      setErrors(undefined);
    }
    setLoading(false);
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
      {errors?.content && (
        <p className="text-red-500 text-sm">{errors.content}</p>
      )}
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <ButtonPrimary
          label="Envoyer"
          color={theme.colors.primary[600]}
          onClick={handleSubmit}
        />
      )}
    </div>
  );
}
