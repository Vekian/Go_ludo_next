import { User } from "@/interfaces";
import { faCity, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import EditUser from "./EditUser";
import UserInfosMobile from "./UserInfosMobile";
function UserInfos({ user, edit = true }: { user: User; edit?: boolean }) {
  return (
    <div
      id="onglet1"
      className="ongletContent  opacity-100 translate-x-0 top-0  transform absolute flex flex-col justify-between w-full"
    >
      <div className="hidden lg:block">
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
            {user.city && (
              <div className="ml-4">
                <FontAwesomeIcon icon={faCity} className="mr-2" />
                {user.city.name}
              </div>
            )}

            <p className="ml-4">{user.age} ans</p>
          </div>
          {edit && <EditUser user={user} />}
        </div>
        <div className="flex mt-3">{user.description}</div>
        <div className="flex flex-wrap justify-between"></div>
        <div className="flex justify-between"></div>
      </div>
      <div className="lg:hidden">
        <UserInfosMobile user={user} />
      </div>
    </div>
  );
}

export default UserInfos;
