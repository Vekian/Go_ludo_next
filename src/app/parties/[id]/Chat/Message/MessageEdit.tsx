"use client";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import ButtonInput from "@/components/ui/button/ButtonInput";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import ButtonSecondary from "@/components/ui/button/ButtonSecondary";
import TextAreaAutosize from "@/components/ui/input/TextAreaAutosize";
import { Message } from "@/interfaces/party.interface";
import { updateMessage } from "@/lib/api/server/chat";
import { theme } from "@/theme/theme";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function MessageEdit({ message }: { message: Message }) {
  const [open, setOpen] = React.useState(false);
  const { showSnackbar } = useSnackbarContext();
  const [contentEdit, setContentEdit] = React.useState(message.content);
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
    const response = await updateMessage(contentEdit, message.id);
    if (response.errors) {
      setErrors(response.errors);
    } else {
      setErrors(undefined);
      setOpen(false);
    }
    showSnackbar(response.message, response.ok ? "success" : "error");
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
        <DialogTitle className="font-farro">Éditer le message</DialogTitle>
        <DialogContent>
          <div className="flex flex-col">
            <label htmlFor="content" className="text-primary-950 font-semibold">
              Message:
            </label>
            <TextAreaAutosize
              minRows={1}
              className="w-full  overflow-y-scroll"
              value={contentEdit}
              onChange={(e) => setContentEdit(e.currentTarget.value)}
            />
            {errors?.content && (
              <p className="text-red-500">{errors.content[0]}</p>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex gap-x-3 ">
            <ButtonSecondary
              onClick={handleClose}
              label="Annuler"
              color={theme.colors.primary[800]}
            />
            <ButtonPrimary
              label="Valider"
              type="submit"
              color={theme.colors.primary[600]}
            />
          </div>
        </DialogActions>
      </Dialog>
      <ButtonInput
        label=""
        color={theme.colors.primary[700]}
        onClick={handleClickOpen}
      />
    </div>
  );
}
