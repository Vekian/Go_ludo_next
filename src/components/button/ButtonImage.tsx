"use client";

import { getImg } from "@/lib/utils";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";

function ButtonImage({ setSourceState, user }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    fetch(`${process.env.REACT_APP_URL}api/picture`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
        }
        return response.json();
      })
      .then((data) => {
        loadData(data);
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
          name="avatar"
          accept=".jpg, .jpeg, .png, .webp"
          className="hidden"
          onInput={(e) => {
            const reader = new FileReader();
            reader.onload = function (event) {
              setSourceState(event.target.result);
            };

            reader.readAsDataURL(e.target.files[0]);
          }}
        />
      </div>

      <input type="submit" />
      <button
        onClick={() => {
          setSourceState(getImg(user.avatar));
        }}
        className="buttonDanger ms-2"
      >
        Annuler
      </button>
    </form>
  );
}

export default ButtonImage;
