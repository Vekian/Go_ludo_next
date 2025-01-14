import { UserProfil } from "@/interfaces";
import { faCity, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import EditUser from "./EditUser";

function UserInfos({ user }: { user: UserProfil }) {
  return (
    <div
      id="onglet1"
      className="ongletContent  opacity-100 translate-x-0  transform absolute flex flex-col justify-between"
    >
      <div className="flex justify-between items-center">
        <div className="flex">
          <FontAwesomeIcon
            icon={user.gender === "Homme" ? faMars : faVenus}
            className={`${
              user.gender === "Homme"
                ? "text-secondary-400"
                : "text-primary-700"
            } text-2xl`}
          />
          <div className="ml-4">
            <FontAwesomeIcon icon={faCity} className="mr-2" />
            Roanne
          </div>
          <p className="ml-4">{user.age} ans</p>
        </div>
        <EditUser user={user} />
      </div>
      <div className="flex mt-3">{user.description}</div>
      <div className="flex flex-wrap justify-between"></div>
      <div className="flex justify-between"></div>
    </div>
  );
}

export default UserInfos;
