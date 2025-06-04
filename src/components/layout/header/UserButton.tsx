"use client";

import React from "react";
import LogInModal from "@/components/modal/LogInModal";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { useSession } from "next-auth/react";
import ProfilButton from "./ProfilButton";
import { theme } from "@/theme/theme";
import { useRouter } from "next/navigation";
import NotificationInput from "./NotificationInput";

function UserButton() {
  const { status, data: session } = useSession();
  const router = useRouter();
  return (
    <div className="order-4 flex items-center">
      {status === "authenticated" ? (
        <div className="flex items-center">
          <NotificationInput user={session.user} />
          <ProfilButton user={session.user}></ProfilButton>
        </div>
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
