"use client";

import { getImg } from "@/lib/utils";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonSecondary from "./ButtonSecondary";
import { UserProfil } from "@/interfaces";
import { useSnackbarContext } from "../provider/SnackbarProvider";

type FormDataInputs = {
  avatar: FileList; // Typage pour le champ "avatar"
};

function ButtonImage({
  setSourceState,
  user,
}: {
  setSourceState: React.Dispatch<React.SetStateAction<string>>;
  user: UserProfil;
}) {
  const { showSnackbar } = useSnackbarContext();
  const { data: session, update } = useSession();
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit } = useForm<FormDataInputs>();

  const onSubmit: SubmitHandler<FormDataInputs> = (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    showSnackbar("Avatar en coours d'upload", "info");
    fetch(`/api/user/picture`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          showSnackbar("Impossible d'upload une nouvell e image", "error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        showSnackbar("Profil modifié", "success");
        setUploading(false);
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="text-center my-3"
    >
      <div>
        <label
          htmlFor="avatar"
          className="bg-primary-700 text-white  rounded-full px-5 py-1.5 cursor-pointer hover:brightness-75"
          style={{ textShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)" }}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          Changer Avatar
        </label>
        <input
          type="file"
          id="avatar"
          accept=".jpg, .jpeg, .png, .webp"
          className="hidden"
          {...register("avatar", { required: true })}
          onInput={(e) => {
            const fileInput = e.target as HTMLInputElement;
            if (fileInput.files && fileInput.files[0]) {
              const reader = new FileReader();
              reader.onload = function (event) {
                // Vérification que event.target.result est bien une chaîne
                if (typeof event.target?.result === "string") {
                  setSourceState(event.target.result);
                }
              };
              reader.readAsDataURL(fileInput.files[0]);
              setUploading(true);
            }
          }}
        />
      </div>
      {uploading && (
        <>
          <input
            type="submit"
            value="Valider"
            className={`bg-primary-700 hover:brightness-90 text-white cursor-pointer rounded-md font-semibold  px-3 py-1.5 m-2.5`}
          />
          <ButtonSecondary
            label="Annuler"
            color="primary-900"
            onClick={() => {
              setSourceState(getImg(user.avatar));
            }}
          />
        </>
      )}
    </form>
  );
}

export default ButtonImage;
