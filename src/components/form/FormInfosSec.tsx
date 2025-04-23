import React, { useState } from "react";
import FormError from "../ui/error/FormError";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PartyDatePicker from "../ui/input/PartyDatePicker";
import InputText from "../ui/input/InputText";
import ButtonPrimary from "../ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { updateGameInfosSec } from "@/lib/api/server/game";
import { Game } from "@/interfaces";
import { useSnackbarContext } from "../provider/SnackbarProvider";
import CustomCircularLoader from "../ui/loader/CustomCircularLoader";

export default function FormInfosSec({
  game,
  setStep,
}: {
  game: Game;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const [contents, setContents] = useState<string[]>([]);
  const [content, setContent] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbarContext();

  const addContent = () => {
    const exists = contents.some((cat) => cat === content);
    if (!exists && content) {
      setContents((prev) => [...prev, content]);
      setContent("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    contents.forEach((content) => {
      formData.append("content[]", content);
    });

    setLoading(true);
    const response = await updateGameInfosSec(formData, game.type, game.id);

    if (!response.ok) {
      if (response.errors) {
        setErrors(response.errors);
      }

      showSnackbar(response.message, "error");
      setLoading(false);
    } else {
      setErrors(null);
      setStep(4);
      setLoading(false);
      showSnackbar(response.message, "success");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col bg-white rounded-lg flex-wrap p-10  gap-y-12">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{
              cancelButtonLabel: "Annuler", // Personnaliser le bouton Cancel
              okButtonLabel: "Valider", // Personnaliser le bouton OK
            }}
          >
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col">
                <label
                  htmlFor="publishedAt"
                  className="text-primary-950 font-semibold"
                >
                  Date de sortie
                </label>
                <PartyDatePicker name="publishedAt" />
                {errors?.publishedAt && (
                  <FormError name="publishedAt" errors={errors.publishedAt} />
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="length"
                  className="text-primary-950 font-semibold"
                >
                  Dimensions
                </label>
                <div className="flex gap-x-3">
                  <div className="w-1/3">
                    <InputText id="length" placeholder="Longueur (cm)" />
                  </div>
                  <div className="w-1/3">
                    <InputText id="width" placeholder="Largeur (cm)" />
                  </div>
                  <div className="w-1/3">
                    <InputText id="height" placeholder="Hauteur (cm)" />
                  </div>
                </div>

                {errors?.length && (
                  <FormError name="length" errors={errors.length} />
                )}
                {errors?.width && (
                  <FormError name="width" errors={errors.width} />
                )}
                {errors?.height && (
                  <FormError name="height" errors={errors.height} />
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="weight"
                  className="text-primary-950 font-semibold"
                >
                  Poids
                </label>
                <InputText id="weight" placeholder="(en grammes)" />
                {errors?.weight && (
                  <FormError name="weight" errors={errors.weight} />
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col gap-y-5 flex-1">
                <label
                  htmlFor="content"
                  className="text-primary-950 font-semibold"
                >
                  Contenu
                </label>
                <ul className="list-disc pl-5">
                  {contents &&
                    contents.map((content, index) => {
                      return <li key={`content${index}`}>{content}</li>;
                    })}
                </ul>
                {errors?.weight && (
                  <FormError name="weight" errors={errors.weight} />
                )}
              </div>
              <div className="flex gap-x-5 flex-1">
                <InputText
                  id="content"
                  value={content ?? undefined}
                  placeholder="Ajouter un contenu"
                  onChange={(value) => {
                    setContent(value ?? null);
                  }}
                />
                <ButtonPrimary
                  label=""
                  color={theme.colors.primary[500]}
                  icon={faPlus}
                  onClick={addContent}
                />
              </div>
            </div>
          </LocalizationProvider>
        </div>
        <div className="flex justify-center pt-6">
          {loading ? (
            <CustomCircularLoader />
          ) : (
            <ButtonPrimary
              label="Ajouter les infos secondaires"
              color={theme.colors.primary[500]}
              type="submit"
            />
          )}
        </div>
      </form>
    </div>
  );
}
