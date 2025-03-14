"use client";
import { UserProfil } from "@/interfaces";
import { faCity, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import EditUser from "./EditUser";
import { Avatar } from "@mui/material";
import { getImg } from "@/lib/utils";
import ButtonImage from "@/components/ui/button/ButtonImage";
function UserInfosMobile({ user }: { user: UserProfil }) {
  const [sourceState, setSourceState] = useState(getImg(user.avatar));
  return (
    <div
      id="onglet1"
      className="ongletContent  opacity-100 translate-x-0 top-0  transform absolute flex flex-col justify-between w-full"
    >
      <div className="flex justify-between items-start flex-wrap w-full">
        <div className="w-1/4">
          <div className="w-20 h-20">
            <Avatar
              alt={user.username}
              src={sourceState}
              sx={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className="-mt-8 ml-6 relative z-40">
            <ButtonImage
              user={user}
              setSourceState={setSourceState}
              id="avatarMobile"
            />
          </div>
        </div>
        <div className="flex flex-col w-3/4 pl-2">
          <div className="flex  justify-between">
            <div>
              {user.username}
              <FontAwesomeIcon
                icon={user.gender === "Homme" ? faMars : faVenus}
                className={`${
                  user.gender === "Homme"
                    ? "text-secondary-400"
                    : "text-primary-700"
                } text-2xl`}
              />
            </div>

            <EditUser user={user} />
          </div>
          <div className=" flex  justify-between">
            <p>{user.age} ans</p>
            <div>
              <FontAwesomeIcon icon={faCity} className="mr-2" />
              Roanne
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-3">{user.description}</div>
    </div>
  );
}

export default UserInfosMobile;
