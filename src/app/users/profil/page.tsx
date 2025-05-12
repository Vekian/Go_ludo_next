import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { UserProfil } from "@/interfaces";
import UserContent from "@/components/layout/user-page/UserContent";
import UserInfos from "@/components/layout/user-page/UserInfos";
import UserParams from "@/components/layout/user-page/UserParams";
import UserNotifs from "@/components/layout/user-page/UserNotifs";
import ListGames from "@/components/list/ListGames";
import { getUser } from "@/lib/api/server/user";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  const userProfil: UserProfil = await getUser(session.user.id);

  return (
    <div className="pt-6">
      <div>
        <UserContent user={userProfil.user}>
          <UserInfos user={userProfil.user} />
          <UserParams user={userProfil.user} />
          <UserNotifs user={userProfil.user} />
        </UserContent>
      </div>
      <div>
        <h1 className="text-center">Collection</h1>
        <ListGames games={userProfil.games} />
      </div>
    </div>
  );
};

export default Page;
