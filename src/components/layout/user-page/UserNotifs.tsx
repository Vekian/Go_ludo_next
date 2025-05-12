import { User } from "@/interfaces";
import React from "react";

function UserNotifs({ user }: { user: User }) {
  return (
    <div
      id="onglet3"
      className="ongletContent  opacity-0 translate-x-full  transform absolute flex flex-col justify-between w-full"
    ></div>
  );
}

export default UserNotifs;
