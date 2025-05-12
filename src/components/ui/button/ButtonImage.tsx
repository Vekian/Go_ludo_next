"use client";

import { getImg } from "@/lib/utils";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import ButtonSecondary from "./ButtonSecondary";
import { User } from "@/interfaces";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import { theme } from "@/theme/theme";
import { uploadAvatar } from "@/lib/api/server/user";

function ButtonImage({
  setSourceState,
  user,
  id,
}: {
  setSourceState: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  id: string;
}) {
  const { showSnackbar } = useSnackbarContext();
  const { data: session, update } = useSession();
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // Récupère tous les champs du form

    showSnackbar("Avatar en coours d'upload", "info");
    const response = await uploadAvatar(formData);

    if (!response.ok) {
      if (response.errors) {
        setErrors(response.errors as Record<string, string[]>);
      }
      showSnackbar("Impossible d'upload une nouvelle image", "error");
    } else {
      if (session && response.avatar) {
        const avatar = response.avatar;
        const updatedSessionUser = {
          ...session.user,
          avatar: avatar,
        };
        await update({
          ...session,
          user: updatedSessionUser,
        });
      }

      showSnackbar("Profil modifié", "success");
      setUploading(false);
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className="text-center my-3"
    >
      <div>
        <label
          htmlFor={id}
          className="bg-primary-700 text-white  rounded-full px-5 py-1.5 cursor-pointer hover:brightness-75 "
          style={{ textShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)" }}
        >
          <FontAwesomeIcon icon={faImage} className="xl:mr-2 mr-0" />
          <span className="xl:inline hidden text-sm">Changer Avatar</span>
        </label>
        <input
          type="file"
          id={id}
          name="avatar"
          accept=".jpg, .jpeg, .png, .webp"
          className="hidden"
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
        <div className="flex items-center">
          <input
            type="submit"
            value="Valider"
            className={`bg-primary-700 hover:brightness-90 text-white cursor-pointer rounded-md font-semibold  px-3 py-1.5 m-2.5`}
          />
          <ButtonSecondary
            label="Annuler"
            color={theme.colors.primary[900]}
            onClick={(e) => {
              e.preventDefault();
              setUploading(false);
              setSourceState(getImg(user.avatar));
            }}
          />
        </div>
      )}
      {errors?.avatar && <p className="text-red-500">{errors.avatar[0]}</p>}
    </form>
  );
}

export default ButtonImage;
