import { getUser } from "@/lib/api/tempApi";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { UserProfil } from "@/interfaces";
import UserContent from "@/components/user-page/UserContent";
import UserInfos from "@/components/user-page/UserInfos";
import CardGame from "@/components/card/CardGame";
import Link from "next/link";
import UserParams from "@/components/user-page/UserParams";
import UserNotifs from "@/components/user-page/UserNotifs";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  const user: UserProfil = await getUser(session.user.id, session.user.token);

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
        <div className="container grid grid-cols-6 gap-5 mt-5">
          {user.games.map((game) => (
            <Link key={`${game.id}list`} href={`/games/${game.id}`}>
              <CardGame game={game} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
