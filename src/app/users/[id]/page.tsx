import React from "react";
import UserContent from "@/components/layout/user-page/UserContent";
import UserInfos from "@/components/layout/user-page/UserInfos";
import UserParams from "@/components/layout/user-page/UserParams";
import UserNotifs from "@/components/layout/user-page/UserNotifs";
import ListGames from "@/components/list/ListGames";
import { getUser } from "@/lib/api/server/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/nextAuth";
import { notFound, redirect } from "next/navigation";
import { handleAuthAdmin } from "@/lib/api/authServer";
import UserConf from "@/components/layout/user-page/UserConf";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await getServerSession(authOptions);
  const id = (await params).id;
  const data = await getUser(id);
  if (!data.data) {
    notFound();
  }
  const userProfil = data.data;
  const edit = await handleAuthAdmin(Number(id), session);

  if (session && session.user.id === id) {
    redirect("/users/profil");
  }
  return (
    <div className="pt-6">
      <div>
        <UserContent user={userProfil.user} edit={edit}>
          <UserInfos user={userProfil.user} edit={edit} />
          {edit && (
            <>
              <UserParams user={userProfil.user} />
              <UserNotifs user={userProfil.user} />
              <UserConf user={userProfil.user} />
            </>
          )}
        </UserContent>
      </div>
      {userProfil.user.confCollection === 1 && (
        <div className="px-1 md:px-6">
          <h1 className="text-center">Collection</h1>
          <ListGames games={userProfil.games} />
        </div>
      )}
    </div>
  );
};

export default Page;
