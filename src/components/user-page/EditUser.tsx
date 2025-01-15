"use client";
import { UserProfil } from "@/interfaces";
import React from "react";
import ButtonInput from "../button/ButtonInput";
import { Button, SelectChangeEvent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SelectClassic from "../input/SelectClassic";
import { theme } from "../../../theme/theme";
import { useRouter } from "next/navigation";
import ButtonSecondary from "../button/ButtonSecondary";

function EditUser({ user }: { user: UserProfil }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [gender, setGender] = React.useState(user.gender);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("gender", gender);
    fetch("/api/user", { body: formData, method: "POST" });
    handleClose();
    router.refresh();
  };
  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle className="font-farro">Éditer le profil</DialogTitle>
        <DialogContent>
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-primary-950 font-semibold"
            >
              Pseudo:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-neutral-50 rounded-full px-3 py-1"
              defaultValue={user.username}
            />
          </div>
          <div className="mt-5">
            <div className="flex">
              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="text-primary-950 font-semibold"
                >
                  Prénom:
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-neutral-50 rounded-full px-3 py-1"
                  defaultValue={user.firstName}
                />
              </div>
              <div className="flex flex-col ml-5">
                <label
                  htmlFor="username"
                  className="text-primary-950 font-semibold"
                >
                  Nom:
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-neutral-50 rounded-full px-3 py-1"
                  defaultValue={user.lastName}
                />
              </div>
            </div>
            <div className="mt-5 flex">
              <div className="flex flex-col">
                <label htmlFor="age" className="text-primary-950 font-semibold">
                  Age:
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  className="bg-neutral-50 rounded-full px-3 py-1"
                  defaultValue={user.age}
                />
              </div>
              <div className="flex flex-col justify-end w-full">
                <SelectClassic
                  value={gender}
                  options={[
                    { label: "Homme", value: "Homme" },
                    { label: "Femme", value: "Femme" },
                  ]}
                  onChange={(event: SelectChangeEvent<string>) => {
                    setGender(event.target.value);
                  }}
                  color={theme.colors.primary[700]}
                />
              </div>
            </div>
            <div className="w-full flex flex-col mt-5">
              <label
                htmlFor="description"
                className="text-primary-950 font-semibold"
              >
                Description:
              </label>
              <textarea
                name="description"
                id="description"
                className="bg-neutral-50 rounded-md px-3 py-1"
                defaultValue={user.description}
                rows={5}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <ButtonSecondary
            onClick={handleClose}
            label="Annuler"
            color={"primary-800"}
          />
          <Button
            className={`bg-primary-600 hover:brightness-90 text-white rounded-md font-semibold  px-3 py-1.5 m-2.5`}
            type="submit"
            sx={{
              textTransform: "none",
            }}
          >
            Soumettre
          </Button>
        </DialogActions>
      </Dialog>
      <ButtonInput
        label="Éditer"
        classColor="primary-700"
        onClick={handleClickOpen}
      />
    </div>
  );
}

export default EditUser;
