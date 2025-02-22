"use client";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import { Party } from "@/interfaces/party.interface";
import { leaveParty } from "@/lib/api/server/party";
import { theme } from "@/theme/theme";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonLeave({ party }: { party: Party }) {
  const { data } = useSession();
  const router = useRouter();

  const handleLeave = async () => {
    if (data) {
      const response = await leaveParty(party.id, Number(data.user.id));
      if (response.ok) {
        if (party.author.id === Number(data.user.id)) {
          router.push("/parties");
        } else {
          router.refresh();
        }
      }
    }
  };
  return (
    <div>
      <ButtonSecondary
        label="Quitter le groupe"
        color={theme.colors.primary[800]}
        onClick={handleLeave}
      />
    </div>
  );
}
