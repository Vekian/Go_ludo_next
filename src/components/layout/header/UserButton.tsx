"use client";

import React from "react";
import LogInModal from "@/components/modal/LogInModal";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { useSession } from "next-auth/react";
import ProfilButton from "./ProfilButton";
import { theme } from "@/theme/theme";
import { useRouter } from "next/navigation";

function UserButton() {
  const { status, data: session } = useSession();
  const router = useRouter();
  return (
    <div className="order-3 flex items-center">
      {status === "authenticated" ? (
        <>
          <ProfilButton user={session.user}></ProfilButton>
        </>
      ) : (
        <div className="flex gap-x-3">
          <LogInModal />
          <ButtonPrimary
            label="S'inscrire"
            color={theme.colors.primary[900]}
            onClick={() => {
              router.push("/signup");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default UserButton;
