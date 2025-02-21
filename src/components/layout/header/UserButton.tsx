"use client";

import React from "react";
import LogInModal from "@/components/modal/LogInModal";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { useSession } from "next-auth/react";
import ProfilButton from "./ProfilButton";

function UserButton() {
  const { status, data: session } = useSession();
  return (
    <div className="order-3">
      {status === "authenticated" ? (
        <>
          <ProfilButton user={session.user}></ProfilButton>
        </>
      ) : (
        <>
          <LogInModal />
          <ButtonPrimary label="S'inscrire" color="primary-900" />
        </>
      )}
    </div>
  );
}

export default UserButton;
