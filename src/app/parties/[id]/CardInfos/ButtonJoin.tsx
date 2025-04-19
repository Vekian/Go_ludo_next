"use client";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import CustomCircularLoader from "@/components/ui/loader/CustomCircularLoader";
import { Party } from "@/interfaces/party.interface";
import { joinParty } from "@/lib/api/server/party";
import { theme } from "@/theme/theme";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ButtonJoin({ party }: { party: Party }) {
  const router = useRouter();
  const { showSnackbar } = useSnackbarContext();
  const [loading, setLoading] = useState(false);
  const handleJoin = async () => {
    showSnackbar("En attente de rejoindre la partie", "info");
    setLoading(true);
    const response = await joinParty(party.id);
    if (response.ok) {
      showSnackbar(response.message, "success");
      router.refresh();
    } else {
      showSnackbar(response.message, "error");
    }
    setLoading(false);
  };
  return (
    <div className="flex justify-center pt-5">
      {loading ? (
        <CustomCircularLoader />
      ) : (
        <ButtonPrimary
          color={theme.colors.primary[500]}
          label="Rejoindre la partie"
          onClick={handleJoin}
        />
      )}
    </div>
  );
}
