import { UserProfil } from "@/interfaces";
import React from "react";
import ButtonPrimary from "../ui/button/ButtonPrimary";

function UserParams({ user }: { user: UserProfil }) {
  return (
    <div
      id="onglet2"
      className="ongletContent  opacity-0 translate-x-full  transform absolute flex flex-col justify-between w-full"
    >
      <div className="flex">
        <div className="flex-1">
          <label
            htmlFor="changeMail"
            className="text-primary-950 font-semibold"
          >
            Adresse email:
          </label>
          <input
            type="text"
            id="changeMail"
            name="changeMail"
            defaultValue={user.email}
            className="bg-neutral-200 rounded-full px-3 py-1 ml-3"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="changePass"
            className="text-primary-950 font-semibold"
          >
            Mot de passe:
          </label>
          <input
            type="text"
            id="changePass"
            name="changePass"
            defaultValue={""}
            className="bg-neutral-200 rounded-full px-3 py-1 ml-3"
          />
        </div>
      </div>
      <div className="flex">
        <div className="mt-6 flex flex-col flex-1">
          <label className="text-primary-950 font-semibold">
            Mot de passe oublié:
          </label>
          <div>
            <ButtonPrimary label="Envoyer par mail" color="primary-600" />
          </div>
        </div>
        <div className="mt-6 flex flex-col flex-1">
          <label
            htmlFor="delAccount"
            className="text-primary-950 font-semibold"
          >
            Suppression de compte:
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="delAccount"
              name="delAccount"
              defaultValue={""}
              className="bg-neutral-200 rounded-full px-3 py-1 ml-3"
            />
            <ButtonPrimary label="Supprimer le compte" color="primary-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserParams;
