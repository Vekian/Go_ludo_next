"use client";

import React from "react";
import LogInModal from "@/components/modal/LogInModal";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { useSession } from "next-auth/react";
import ProfilButton from "./ProfilButton";
import { theme } from "@/theme/theme";

function UserButton() {
  const { status, data: session } = useSession();
  return (
    <div className="order-3 flex items-center">
      {status === "authenticated" ? (
        <>
          <ProfilButton user={session.user}></ProfilButton>
        </>
      ) : (
        <>
          <LogInModal />
          <ButtonPrimary label="S'inscrire" color={theme.colors.primary[900]} />
        </>
      )}
    </div>
  );
}

export default UserButton;
