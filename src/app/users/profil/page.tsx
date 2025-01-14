import { getUser } from "@/lib/api/tempApi";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { UserProfil } from "@/interfaces";
import UserContent from "@/components/user-page/UserContent";
import UserInfos from "@/components/user-page/UserInfos";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  const user: UserProfil = await getUser(session.user.id, session.user.token);

  return (
    <div>
      <UserContent user={user}>
        <UserInfos user={user} />
      </UserContent>
    </div>
  );
};

export default Page;
