"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import {
  coverImageGame,
  deleteImageGame,
  uploadImageGame,
} from "@/lib/api/server/game";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import FormError from "../ui/error/FormError";
import { Game, ImageGame } from "@/interfaces";
import { getImg } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { getBaseUrl } from "@/lib/game";

export default function FormImage({ game }: { game: Game }) {
  const [images, setImages] = useState<ImageGame[]>([]);

  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const { showSnackbar } = useSnackbarContext();
  const router = useRouter();

  useEffect(() => {
    setImages(game.images);
  }, [game]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      handleUpload(fileInput.files[0], game.id);
    }

    // Réinitialise le champ pour pouvoir recharger les mêmes fichiers si besoin
    e.target.value = "";
  };

  const handleUpload = async (image: File, gameId: number) => {
    const formData = new FormData();
    formData.set("file", image);
    const response = await uploadImageGame(formData, gameId);
    if (!response.ok) {
      if (response.errors) {
        setErrors(response.errors);
      }
      if (response.message) {
        showSnackbar(response.message, "error");
      }
    } else {
      router.refresh();
    }
  };

  const removeImage = async (indexToRemove: number) => {
    if (game.images && indexToRemove < game.images.length) {
      const imageGame = game.images[indexToRemove];
      const response = await deleteImageGame(imageGame.id);
      if (!response.ok) {
        showSnackbar(response.message, "error");
      } else {
        showSnackbar(response.message, "success");
        router.refresh();
      }
    } else {
      showSnackbar("image introuvable", "error");
      return;
    }
  };

  const coverImage = async (indexToCover: number) => {
    if (game.images && indexToCover < game.images.length) {
      const imageGame = game.images[indexToCover];
      const response = await coverImageGame(imageGame.id);
      if (!response.ok) {
        showSnackbar(response.message, "error");
      } else {
        showSnackbar(response.message, "success");
        router.refresh();
      }
    } else {
      showSnackbar("image introuvable", "error");
      return;
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-6">
      <div className="flex flex-col md:items-start items-center bg-white rounded-lg flex-wrap p-10 gap-y-6 w-full">
        <div className="flex items-center">
          <label
            htmlFor="images"
            className="bg-primary-700 text-white rounded-md px-5 py-1.5 cursor-pointer hover:brightness-75 inline-flex items-center gap-2 font-bold"
            style={{ textShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)" }}
          >
            <FontAwesomeIcon icon={faImage} />
            <span className="text-sm">Choisir des images</span>
          </label>

          <input
            type="file"
            id="images"
            name="images"
            accept=".jpg, .jpeg, .png, .webp"
            className="hidden"
            multiple
            onChange={handleInput}
          />
          {errors?.file && <FormError name="file" errors={errors.file} />}
        </div>

        <div className="flex md:justify-start justify-center flex-wrap gap-4">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-32 min-h-32 ">
                <Image
                  src={getImg(image.filepath)}
                  alt={`Preview ${index}`}
                  fill
                  objectFit="contain"
                />
              </div>

              <div className="flex items-center gap-x-2">
                {image.cover ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <ButtonPrimary
                    label="Couverture"
                    color={theme.colors.primary[700]}
                    onClick={() => coverImage(index)}
                    icon={faImage}
                  />
                )}

                <ButtonPrimary
                  label=""
                  color={theme.colors.primary[700]}
                  onClick={() => removeImage(index)}
                  icon={faTrash}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-x-3">
        <ButtonPrimary
          label="Passer à l'étape suivante"
          color={theme.colors.primary[500]}
          onClick={() => {
            router.push(`/${getBaseUrl(game)}edit/${game.id}/3`);
          }}
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
