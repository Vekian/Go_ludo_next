import { UserProfil } from "@/interfaces";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import React from "react";

function ProfilButton({ user }: { user: UserProfil }) {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => signOut({ callbackUrl: "/" })} // Rediriger après déconnexion
    >
      Se déconnecter
    </Button>
  );
}

export default ProfilButton;
