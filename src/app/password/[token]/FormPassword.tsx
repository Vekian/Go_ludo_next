"use client";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import FormError from "@/components/ui/error/FormError";
import InputText from "@/components/ui/input/InputText";
import CustomCircularLoader from "@/components/ui/loader/CustomCircularLoader";
import { resetPassword } from "@/lib/api/server/user";
import { theme } from "@/theme/theme";
import React, { useState } from "react";

export default function FormPassword({ token }: { token: string }) {
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbarContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    const response = await resetPassword(token, formData);
    console.log(response);

    if (!response.ok) {
      showSnackbar(response.message, "error");
      if (response.errors) {
        setErrors(response.errors);
      }
    } else {
      showSnackbar(response.message, "success");
      setErrors(undefined);
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 px-6 w-1/2 flex flex-col gap-y-3"
    >
      <div className="flex flex-col">
        <label>Tapez votre nouveau mot de passe</label>
        <InputText id="password" type="password" />
        {errors?.plainPassword && (
          <FormError errors={errors.plainPassword} name="plainPassword" />
        )}
      </div>
      <div className="flex flex-col">
        <label>Confirmez votre nouveau mot de passe</label>
        <InputText id="passwordConfirm" type="password" />
        {errors?.passwordConfirm && (
          <FormError errors={errors.passwordConfirm} name="passwordConfirm" />
        )}
      </div>
      {errors?.link && <FormError errors={errors.link} name="link" />}
      <div className="flex w-full justify-center">
        {loading ? (
          <div className="text-center mt-6">
            <CustomCircularLoader />
          </div>
        ) : (
          <ButtonPrimary
            label="S'inscrire"
            color={theme.colors.primary[600]}
            type="submit"
          />
        )}
      </div>
    </form>
  );
}
