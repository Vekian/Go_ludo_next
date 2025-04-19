"use client";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import CustomCircularLoader from "@/components/ui/loader/CustomCircularLoader";
import { Party } from "@/interfaces/party.interface";
import { leaveParty } from "@/lib/api/server/party";
import { theme } from "@/theme/theme";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ButtonLeave({ party }: { party: Party }) {
  const { data } = useSession();
  const router = useRouter();
  const { showSnackbar } = useSnackbarContext();
  const [loading, setLoading] = useState(false);

  const handleLeave = async () => {
    if (data) {
      showSnackbar("En attente de quitter la partie", "info");
      setLoading(true);
      const response = await leaveParty(party.id, Number(data.user.id));
      if (response.ok) {
        showSnackbar(response.message, "success");
        if (party.author.id === Number(data.user.id)) {
          router.push("/parties");
        } else {
          router.refresh();
        }
      } else {
        showSnackbar(response.message, "error");
      }
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <CustomCircularLoader />
      ) : (
        <ButtonSecondary
          label="Quitter le groupe"
          color={theme.colors.primary[800]}
          onClick={handleLeave}
        />
      )}
    </div>
  );
}
