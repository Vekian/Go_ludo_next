import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/api/nextAuth";
import { redirect } from "next/navigation";
import UserContent from "@/components/layout/user-page/UserContent";
import UserInfos from "@/components/layout/user-page/UserInfos";
import UserParams from "@/components/layout/user-page/UserParams";
import UserNotifs from "@/components/layout/user-page/UserNotifs";
import ListGames from "@/components/list/ListGames";
import { getUser } from "@/lib/api/server/user";
import UserConf from "@/components/layout/user-page/UserConf";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  const userProfil = await getUser(session.user.id);

  if (!userProfil.data) {
    throw new Error(
      "Impossible de récupérer les informations de l'utilisateur"
    );
  }
  const user = userProfil.data;

  return (
    <div className="pt-6">
      <div>
        <UserContent user={user.user}>
          <UserInfos user={user.user} />
          <UserParams user={user.user} />
          <UserNotifs user={user.user} />
          <UserConf user={user.user} />
        </UserContent>
      </div>
      <div>
        <h1 className="text-center">Collection</h1>
        <ListGames games={user.games} />
      </div>
    </div>
  );
};

export default Page;
