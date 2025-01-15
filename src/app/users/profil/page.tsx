import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { UserProfil } from "@/interfaces";
import UserContent from "@/components/user-page/UserContent";
import UserInfos from "@/components/user-page/UserInfos";
import UserParams from "@/components/user-page/UserParams";
import UserNotifs from "@/components/user-page/UserNotifs";
import ListGames from "@/components/list/ListGames";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  const user: UserProfil = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/${session.user.id}`,
    { headers: { Authorization: "Bearer " + session.user.token } }
  ).then((response) => response.json());

  return (
    <div>
      <div>
        <UserContent user={user}>
          <UserInfos user={user} />
          <UserParams user={user} />
          <UserNotifs user={user} />
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
