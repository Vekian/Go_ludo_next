"use client";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { User } from "@/interfaces";
import { updateUser } from "@/lib/api/server/user";
import { theme } from "@/theme/theme";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

function UserNotifs({ user }: { user: User }) {
  const { showSnackbar } = useSnackbarContext();
  const [notifPartyMessage, setNotifPartyMessage] = React.useState(
    user.notifPartyMessage ?? false
  );
  const [notifPartyMember, setNotifPartyMember] = React.useState(
    user.notifPartyMember ?? false
  );
  const [notifGameRelease, setNotifGameRelease] = React.useState(
    user.notifGameRelease ?? false
  );
  const [notifPartyZone, setNotifPartyZone] = React.useState(
    user.notifPartyZone ?? false
  );
  const handleNotifPartyMessage = async (
    _: React.SyntheticEvent,
    checked: boolean
  ) => {
    const data = {
      notifPartyMessage: checked,
    };
    const response = await updateUser(data, user.id);
    if (response.ok) {
      setNotifPartyMessage(!notifPartyMessage);
      showSnackbar(response.message, "success");
    } else {
      showSnackbar(response.message, "error");
    }
  };

  const handleNotifPartyMember = async (
    _: React.SyntheticEvent,
    checked: boolean
  ) => {
    const data = {
      notifPartyMember: checked,
    };
    const response = await updateUser(data, user.id);
    if (response.ok) {
      setNotifPartyMember(!notifPartyMember);
      showSnackbar(response.message, "success");
    } else {
      showSnackbar(response.message, "error");
    }
  };

  const handleNotifGameRelease = async (
    _: React.SyntheticEvent,
    checked: boolean
  ) => {
    const data = {
      notifPartyMember: checked,
    };
    const response = await updateUser(data, user.id);
    if (response.ok) {
      setNotifGameRelease(!notifGameRelease);
      showSnackbar(response.message, "success");
    } else {
      showSnackbar(response.message, "error");
    }
  };

  const handleNotifPartyZone = async (
    _: React.SyntheticEvent,
    checked: boolean
  ) => {
    const data = {
      notifPartyZone: checked,
    };
    const response = await updateUser(data, user.id);
    if (response.ok) {
      setNotifPartyZone(!notifPartyZone);
      showSnackbar(response.message, "success");
    } else {
      showSnackbar(response.message, "error");
    }
  };

  return (
    <div
      id="onglet3"
      className="ongletContent  opacity-0 translate-x-full  transform absolute flex flex-col justify-between w-full gap-y-5"
    >
      <div className="flex gap-x-12 flex-wrap">
        <div className="flex flex-col gap-y-3">
          <p>Pour les messages de parties:</p>
          <FormControlLabel
            control={<Checkbox />}
            label="Activé"
            checked={notifPartyMessage}
            onChange={handleNotifPartyMessage}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <p>Pour être notifié des entrées/sorties dans la partie :</p>
          <FormControlLabel
            control={<Checkbox />}
            label="Activé"
            checked={notifPartyMember}
            onChange={handleNotifPartyMember}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <p>Pour les sorties d&apos;un jeu (extensions):</p>
          <div className="flex gap-x-6">
            <FormControlLabel
              control={<Checkbox />}
              label="Activé"
              defaultChecked={user.notifGameRelease}
              onChange={handleNotifGameRelease}
            />
            <ButtonPrimary
              label="Ajouter un jeu"
              color={theme.colors.primary[600]}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <div>
          <h4>Zones d&apos;alerte:</h4>
          <p>
            Vous pouvez paramétrer des zones d&apos;alerte, lorsqu&apos;une
            partie sera lancée, une notification vous est envoyée
          </p>
        </div>
        <div className="flex gap-x-6">
          <FormControlLabel
            control={<Checkbox />}
            label="Activé"
            checked={notifPartyZone}
            onChange={handleNotifPartyZone}
          />
          <ButtonPrimary
            label="Ajouter une zone"
            color={theme.colors.primary[600]}
          />
        </div>
      </div>
    </div>
  );
}

export default UserNotifs;
