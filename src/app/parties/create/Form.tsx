"use client";
import { GameCategory, GameListItem } from "@/interfaces";
import React, { useState } from "react";
import FormInfosParty from "./FormInfosParty";
import FormLocalisationParty from "./FormLocalisationParty";
import FormGame from "./FormGame";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import { createParty } from "@/lib/api/server/party";
import { useRouter } from "next/navigation";
import CustomCircularLoader from "@/components/ui/loader/CustomCircularLoader";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
export default function Form({
  categories,
  themes,
  modes,
}: {
  categories: GameCategory[];
  themes: GameCategory[];
  modes: GameCategory[];
}) {
  const [games, setGames] = useState<GameListItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const { showSnackbar } = useSnackbarContext();
  const router = useRouter();

  const addGame = (game: GameListItem) => {
    if (!games) {
      setGames([game]);
    } else {
      setGames([...games, game]);
    }
  };

  const removeGame = (game: GameListItem) => {
    if (!games) return;

    setGames(games.filter((g) => g.id !== game.id));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    showSnackbar("Création de partie en cours", "info");
    const formData = new FormData(event.currentTarget);

    const ages = formData.getAll("age");
    const players = formData.getAll("players");
    formData.set("playersMin", players[0]);
    formData.set("playersMax", players[1]);
    formData.set("ageMin", ages[0]);
    formData.set("ageMax", ages[1]);
    formData.delete("players");
    formData.delete("age");

    const gamesId = games?.map((game) => game.id);

    const response = await createParty(formData, gamesId);
    if (response.errors) {
      setErrors(response.errors);
      showSnackbar("Erreur lors de la création de partie", "error");
    } else {
      setErrors(null);
      const id = response.data.id;
      router.push(`/parties/${id}`);
      showSnackbar("Partie créée avec succès", "success");
    }
  };
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-y-6">
        <FormInfosParty errors={errors} />
        <FormGame
          categories={categories}
          themes={themes}
          modes={modes}
          gamesAdd={games}
          addGame={addGame}
          removeGame={removeGame}
          errors={errors}
        />
        <FormLocalisationParty errors={errors} />
        <div className="flex justify-center mb-32 mt-6">
          {loading ? (
            <CustomCircularLoader />
          ) : (
            <ButtonPrimary
              type="submit"
              color={theme.colors.primary[500]}
              label="Créer la partie"
            />
          )}
        </div>
      </div>
    </form>
  );
}
