"use client";
import { User } from "@/interfaces";
import React from "react";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import { sendLinkResetPassword, updateMailProfil } from "@/lib/api/server/user";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import CustomCircularLoader from "@/components/ui/loader/CustomCircularLoader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FormError from "@/components/ui/error/FormError";

function UserParams({ user }: { user: User }) {
  const [loadingReset, setLoadingReset] = React.useState(false);
  const { data, update } = useSession();
  const router = useRouter();
  const { showSnackbar } = useSnackbarContext();
  const [errors, setErrors] =
    React.useState<Record<string, string[] | undefined>>();

  async function handleResetPassword() {
    setLoadingReset(true);
    const response = await sendLinkResetPassword(user.email);
    if (!response.ok) {
      showSnackbar(response.message, "error");
    } else {
      showSnackbar(response.message, "success");
    }
    setLoadingReset(false);
  }

  async function handleChangeMail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await updateMailProfil(formData, user.id);
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
          token: null,
        };
        await update({
          ...data,
          user: updatedSessionUser,
        });
        showSnackbar("Profil modifié", "success");
        setErrors(undefined);
      }
      router.refresh();
    }
  }
  return (
    <div
      id="onglet2"
      className="ongletContent  opacity-0 translate-x-full  transform absolute flex flex-col justify-between w-full"
    >
      <form
        action=""
        className="flex flex-col gap-y-3"
        onSubmit={handleChangeMail}
      >
        <div className="flex gap-3 flex-wrap">
          <div className="md:flex-1">
            <label htmlFor="email" className="text-primary-950 font-semibold">
              Changer l&apos;email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={user.email}
              className="bg-neutral-200 rounded-full px-3 py-1 ml-3"
            />
            {errors?.email && <FormError errors={errors.email} name="email" />}
          </div>
          <div className="md:flex-1">
            <label
              htmlFor="password"
              className="text-primary-950 font-semibold"
            >
              Mot de passe:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={""}
              className="bg-neutral-200 rounded-full px-3 py-1 ml-3"
            />
            {errors?.password && (
              <FormError errors={errors.password} name="password" />
            )}
          </div>
          <div className="flex justify-center">
            <ButtonPrimary
              type="submit"
              label="Changer de mail"
              color={theme.colors.primary[600]}
            />
          </div>
        </div>
      </form>
      <div className="border-b-2 border-b-neutral-200 mt-3 "></div>
      <div className="flex gap-3 flex-wrap">
        <div className="mt-6 flex flex-col md:flex-1">
          <label className="text-primary-950 font-semibold">
            Mot de passe oublié:
          </label>
          <div>
            {loadingReset ? (
              <CustomCircularLoader />
            ) : (
              <ButtonPrimary
                onClick={handleResetPassword}
                label="Envoyer par mail"
                color={theme.colors.primary[600]}
              />
            )}
          </div>
        </div>
        <div className="mt-6 flex  flex-col md:flex-1">
          <label
            htmlFor="delAccount"
            className="text-primary-950 font-semibold"
          >
            Suppression de compte:
          </label>
          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="text"
              id="delAccount"
              name="delAccount"
              defaultValue={""}
              className="bg-neutral-200 rounded-full px-3 py-1 ml-3"
            />
            <ButtonPrimary
              label="Supprimer le compte"
              color={theme.colors.primary[700]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserParams;
