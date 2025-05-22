"use client";
import { User } from "@/interfaces";
import React from "react";
import ButtonInput from "@/components/ui/button/ButtonInput";
import { SelectChangeEvent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SelectClassic from "@/components/ui/input/SelectClassic";
import { theme } from "@/theme/theme";
import { useRouter } from "next/navigation";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import { useSession } from "next-auth/react";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import { updateProfil } from "@/lib/api/server/user";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import InputSearchCity from "@/components/ui/input/search/InputSearchCity";
import { faCity } from "@fortawesome/free-solid-svg-icons";

function EditUser({ user }: { user: User }) {
  const { data, update } = useSession();
  const { showSnackbar } = useSnackbarContext();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [gender, setGender] = React.useState(user.gender);
  const [errors, setErrors] =
    React.useState<Record<string, string[] | undefined>>();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("gender", gender);
    showSnackbar("Profil en cours de modification", "info");

    const response = await updateProfil(formData, Number(data?.user.id));

    if (!response.ok) {
      if (response.errors) {
        setErrors(response.errors);
      }
      showSnackbar(
        "Impossible de modifier le profil, veuillez réessayer plus tard",
        "error"
      );
    } else {
      if (data && update && response.data) {
        const updatedUser = response.data;
        const updatedSessionUser = {
          ...updatedUser,
          name: updatedUser.username,
          token: data.user.token,
        };
        await update({
          ...data,
          user: updatedSessionUser,
        });
        showSnackbar("Profil modifié", "success");
        setErrors(undefined);
      }
      handleClose(event);
      router.refresh();
    }
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
            {errors?.username && (
              <p className="text-red-500">{errors.username[0]}</p>
            )}
          </div>
          <div className="mt-5">
            <div className="flex">
              <div className="flex flex-col">
                <label
                  htmlFor="firstname"
                  className="text-primary-950 font-semibold"
                >
                  Prénom:
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="bg-neutral-50 rounded-full px-3 py-1"
                  defaultValue={user.firstname}
                />
                {errors?.firstname && (
                  <p className="text-red-500">{errors.firstname[0]}</p>
                )}
              </div>
              <div className="flex flex-col ml-5">
                <label
                  htmlFor="lastname"
                  className="text-primary-950 font-semibold"
                >
                  Nom:
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="bg-neutral-50 rounded-full px-3 py-1"
                  defaultValue={user.lastname}
                />
                {errors?.lastname && (
                  <p className="text-red-500">{errors.lastname[0]}</p>
                )}
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
                {errors?.age && <p className="text-red-500">{errors.age[0]}</p>}
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
                {errors?.gender && (
                  <p className="text-red-500">{errors.gender[0]}</p>
                )}
              </div>
            </div>
            <div className="mt-5 w-full">
              <InputSearchCity label="Ville" icon={faCity} />
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
              {errors?.description && (
                <p className="text-red-500">{errors.description[0]}</p>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <ButtonSecondary
            onClick={handleClose}
            label="Annuler"
            color={theme.colors.primary[800]}
          />
          <ButtonPrimary
            color={theme.colors.primary[500]}
            label="Modifier"
            type="submit"
          />
        </DialogActions>
      </Dialog>
      <ButtonInput
        label="Éditer"
        color={theme.colors.primary[700]}
        onClick={handleClickOpen}
      />
    </div>
  );
}

export default EditUser;
