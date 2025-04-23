import { Game, Creator, GameCreator } from "@/interfaces";
import React, { useState } from "react";
import CreatorSelect from "../ui/input/CreatorSelect";
import SelectClassic from "../ui/input/SelectClassic";
import { theme } from "@/theme/theme";
import { SelectChangeEvent } from "@mui/material";
import ButtonPrimary from "../ui/button/ButtonPrimary";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CreatorJob, jobNames } from "@/interfaces/enum.interface";
import CardCreator from "../cards/CardCreator";
import { addGameCreator } from "@/lib/api/server/creator";
import { useSnackbarContext } from "../provider/SnackbarProvider";
import FormError from "../ui/error/FormError";

export default function FormCreators({
  game,
  setStep,
}: {
  game: Game;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [creatorSelected, setCreatorSelected] = useState<Creator | null>(null);
  const [job, setJob] = useState("");
  const [creatorsSelected, setCreatorsSelected] = useState<Creator[]>([]);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const { showSnackbar } = useSnackbarContext();

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
      const creator = creatorsSelected.find(
        (creator) => creator.id === creatorSelected.id
      );
      if (creator) {
        creator.jobs.push(job);
      } else {
        const newCreator: Creator = {
          id: creatorSelected.id,
          name: creatorSelected.name,
          image: creatorSelected.image,
          jobs: [job],
        };
        setCreatorsSelected((prev) => [...prev, newCreator]);
      }
    }
  };

  const submitCreators = () => {
    if (creatorsSelected) {
      const gameCreators: GameCreator[] = creatorsSelected.map(
        (creatorSelected) => {
          return {
            game: game.id,
            creator: creatorSelected.id,
            jobs: creatorSelected.jobs,
          };
        }
      );
      setErrors(null);
      gameCreators.forEach(async (gameCreator) => {
        const response = await addGameCreator(gameCreator);
        const creator = creatorsSelected.find(
          (creatorToFind) => gameCreator.creator === creatorToFind.id
        );
        if (!response.ok) {
          showSnackbar(response.message, "error");
          setErrors({
            gameCreator: [creator?.name + "n'a pas pu être associé au jeu"],
          });
        }
      });
      if (!errors) {
        showSnackbar("Créateur associé au jeu avec succès", "success");
        setStep(5);
      }
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
                  setCreatorSelected(creator);
                  setJob(creator?.jobs[0] ?? "");
                }}
                creatorSelected={creatorSelected}
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
                  options={creatorSelected.jobs.map((job) => ({
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
                      .filter((creator) => creator.jobs.includes(job))
                      .map((creator) => (
                        <CardCreator creator={creator} key={creator.id} />
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
      <div className="flex justify-center">
        <ButtonPrimary
          label="Modifier les créateurs"
          color={theme.colors.primary[500]}
          onClick={submitCreators}
        />
      </div>
    </div>
  );
}
