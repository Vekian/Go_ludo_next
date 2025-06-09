"use client";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import SelectClassic from "@/components/ui/input/SelectClassic";
import { User } from "@/interfaces";
import { updateUser } from "@/lib/api/server/user";
import { theme } from "@/theme/theme";
import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";

function UserConf({ user }: { user: User }) {
  const [confCollection, setConfCollection] = useState(
    user.confCollection ? String(user.confCollection) : "1"
  );
  const { showSnackbar } = useSnackbarContext();

  const handleConfCollection = async (event: SelectChangeEvent<string>) => {
    const data = {
      confCollection: Number(event.target.value),
    };

    const response = await updateUser(data, user.id);
    if (response.ok) {
      setConfCollection(event.target.value);
      showSnackbar(response.message, "success");
    } else {
      showSnackbar(response.message, "error");
    }
  };
  return (
    <div
      id="onglet4"
      className="ongletContent  opacity-0 translate-x-full  transform absolute flex flex-col justify-between w-full pt-2 gap-y-3"
    >
      <div>
        <h3>Choisissez qui peut voir</h3>
      </div>
      <div className="flex">
        <div>
          <p>Votre collection:</p>
          <SelectClassic
            color={theme.colors.primary[900]}
            options={[
              {
                label: "Tout le monde",
                value: "1",
              },
              {
                label: "Personne",
                value: "3",
              },
            ]}
            label=""
            value={confCollection}
            onChange={handleConfCollection}
          />
        </div>
      </div>
    </div>
  );
}

export default UserConf;
