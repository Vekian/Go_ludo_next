"use client";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import { UserStatus } from "@/interfaces";
import { Party } from "@/interfaces/party.interface";
import { leaveParty } from "@/lib/api/server/party";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function CardUserButtons({
  user,
  party,
}: {
  user: UserStatus;
  party?: Party;
}) {
  const { data } = useSession();
  const { showSnackbar } = useSnackbarContext();
  const router = useRouter();

  if (!data) return null;
  const handleDelete = async () => {
    if (!party) {
      return;
    }
    showSnackbar("Éjection de l'utilisateur de la partie", "info");
    const response = await leaveParty(party.id, user.id);
    if (!response.ok) {
      showSnackbar("Erreur lors de l'éjection de l'utilisateur", "error");
    } else {
      showSnackbar("Éjection de l'utilisateur avec succès", "success");
      router.refresh();
    }
  };

  return (
    <div className="float-right ">
      {party &&
        party.author.id === Number(data.user.id) &&
        user.id !== Number(data.user.id) && (
          <Tooltip placement="top" title={`Éjecter de la partie`}>
            <div
              className="flex justify-center -ml-6 hover:bg-primary-50 bg-white rounded-lg w-10 py-3 cursor-pointer mb-2"
              onClick={handleDelete}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className={`transition-transform text-xl rotate-45 text-primary-700`}
              />
            </div>
          </Tooltip>
        )}
    </div>
  );
}
