"use client";
import { Game, Creator, GameCreator, GameCreatorToAdd } from "@/interfaces";
import React, { useEffect, useState } from "react";
import CreatorSelect from "../ui/input/CreatorSelect";
import SelectClassic from "../ui/input/SelectClassic";
import { theme } from "@/theme/theme";
import { SelectChangeEvent } from "@mui/material";
import ButtonPrimary from "../ui/button/ButtonPrimary";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CreatorJob, jobNames } from "@/interfaces/creator.interface";
import CardCreator from "../cards/CardCreator";
import { addGameCreator, deleteGameCreator } from "@/lib/api/server/creator";
import { useSnackbarContext } from "../provider/SnackbarProvider";
import FormError from "../ui/error/FormError";
import { useRouter } from "next/navigation";
import { getBaseUrl } from "@/lib/game";

export default function FormCreators({ game }: { game: Game }) {
  const [creatorSelected, setCreatorSelected] = useState<GameCreator | null>(
    null
  );
  const [job, setJob] = useState("");
  const [creatorsSelected, setCreatorsSelected] = useState<GameCreator[]>([]);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const { showSnackbar } = useSnackbarContext();
  const router = useRouter();

  useEffect(() => {
    const allCreators = Object.entries(game.creators).flatMap(
      ([job, creatorsArray]) =>
        creatorsArray.map((gameCreator: GameCreator) => {
          gameCreator.creator.jobs = [job];
          return gameCreator;
        })
    );
    setCreatorsSelected(allCreators);
  }, [game]);

  const handleSelect = () => {
    if (!creatorSelected) {
      setErrors({
        creator: ["Veuillez sélectionner un créateur"],
      });
    } else if (!job) {
      setErrors({
        job: ["Veuillez sélectionner un job"],
      });
    } else {
      const gameCreator = creatorsSelected.find(
        (gameCreator) => gameCreator.creator.id === creatorSelected.creator.id
      );
      if (gameCreator) {
        gameCreator.creator.jobs.push(job);
      } else {
        const newCreator: GameCreator = {
          creator: creatorSelected.creator,
          id: creatorSelected.id,
        };
        setCreatorsSelected((prev) => [...prev, newCreator]);
      }
      setCreatorSelected(null);
      setJob("");
    }
  };

  const submitCreators = () => {
    if (creatorsSelected) {
      const gameCreators: GameCreatorToAdd[] = creatorsSelected
        .filter((creator) => !creator.id)
        .map((creator) => ({
          game: game.id,
          creator: creator.creator.id,
          jobs: creator.creator.jobs,
        }));
      setErrors(null);
      gameCreators.forEach(async (gameCreator) => {
        const response = await addGameCreator(gameCreator);
        const creator = creatorsSelected.find(
          (creatorToFind) => gameCreator.creator === creatorToFind.id
        );
        if (!response.ok) {
          showSnackbar(response.message, "error");
          setErrors({
            gameCreator: [
              creator?.creator.name + "n'a pas pu être associé au jeu",
            ],
          });
        }
      });
      if (!errors) {
        showSnackbar("Créateur associé au jeu avec succès", "success");
        router.refresh();
      }
    }
  };

  const deleteCreator = async (gameCreator: GameCreator) => {
    if (gameCreator.id) {
      const response = await deleteGameCreator(gameCreator.id);
      if (!response.ok) {
        showSnackbar(response.message, "error");
      } else {
        showSnackbar(response.message, "success");
        router.refresh();
      }
    } else {
      setCreatorsSelected(
        creatorsSelected.filter(
          (creator) => creator.creator.id !== gameCreator.creator.id
        )
      );
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col bg-white rounded-lg flex-wrap p-10  gap-y-12">
        <div className="flex flex-col gap-y-6">
          <div className="flex gap-x-6 items-start">
            <div className="w-1/3">
              <CreatorSelect
                setCreatorSelected={(creator: Creator | null) => {
                  if (creator) {
                    const gameCreator: GameCreator = {
                      creator: creator,
                    };
                    setCreatorSelected(gameCreator);
                    setJob(gameCreator?.creator.jobs[0] ?? "");
                  } else {
                    setCreatorSelected(null);
                    setJob("");
                  }
                }}
                creatorSelected={
                  creatorSelected ? creatorSelected.creator : null
                }
              />
              {errors?.creator && (
                <FormError name="creator" errors={errors.creator} />
              )}
            </div>
            {creatorSelected && (
              <div className="w-1/3">
                <SelectClassic
                  color={theme.colors.primary[900]}
                  value={job}
                  onChange={(event: SelectChangeEvent<string>) => {
                    setJob(event.target.value);
                  }}
                  options={creatorSelected.creator.jobs.map((job) => ({
                    name: "creator[]",
                    label: jobNames[job as CreatorJob],
                    value: job,
                  }))}
                />

                {errors?.job && <FormError name="job" errors={errors.job} />}
              </div>
            )}
            <ButtonPrimary
              label=""
              color={theme.colors.primary[500]}
              icon={faPlus}
              onClick={handleSelect}
            />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {Object.values(CreatorJob).map((job) => (
              <div className="w-1/4 flex flex-col gap-y-3 " key={job}>
                <h4>{jobNames[job]}s</h4>
                <div className="flex justify-start">
                  {creatorsSelected &&
                    creatorsSelected
                      .filter((creator) => creator.creator.jobs.includes(job))
                      .map((creator) => (
                        <div
                          key={creator.creator.id}
                          className="flex flex-col items-center"
                        >
                          <CardCreator creator={creator.creator} />
                          <ButtonPrimary
                            color={theme.colors.primary[700]}
                            label=""
                            icon={faTrash}
                            onClick={() => deleteCreator(creator)}
                          />
                        </div>
                      ))}
                </div>
              </div>
            ))}
          </div>
          {errors?.gameCreator && (
            <FormError name="gameCreator" errors={errors.gameCreator} />
          )}
        </div>
      </div>
      <div className="flex justify-center gap-x-3">
        <ButtonPrimary
          label="Modifier les créateurs"
          color={theme.colors.primary[500]}
          onClick={submitCreators}
        />
        <ButtonPrimary
          label="Voir la fiche"
          color={theme.colors.primary[900]}
          onClick={() => {
            router.push(`/${getBaseUrl(game)}${game.id}`);
          }}
        />
      </div>
    </div>
  );
}
