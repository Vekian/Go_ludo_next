"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import { deleteImageGame, uploadImageGame } from "@/lib/api/server/game";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import FormError from "../ui/error/FormError";
import { Game } from "@/interfaces";
import { getImg } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function FormImage({ game }: { game: Game }) {
  const [previews, setPreviews] = useState<string[]>(
    game ? game.images.map((image) => getImg(image.filepath)) : []
  );
  const [images, setImages] = useState<File[]>([]);
  const [imagesUploaded, setImagesUploaded] = useState<boolean[]>(
    game ? game.images.map(() => true) : []
  );
  const [indexError, setIndexError] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const { showSnackbar } = useSnackbarContext();
  const router = useRouter();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    const newPreviews: string[] = [];
    const newUploadeds: boolean[] = [];

    let loaded = 0;
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        if (typeof event.target?.result === "string") {
          newPreviews.push(event.target.result);
          newUploadeds.push(false);
          loaded++;
          if (loaded === newFiles.length) {
            setImages((prev) => [...prev, ...newFiles]);
            setPreviews((prev) => [...prev, ...newPreviews]);
            setImagesUploaded((prev) => [...prev, ...newUploadeds]);
          }
        }
      };
      reader.readAsDataURL(file);
    });

    // Réinitialise le champ pour pouvoir recharger les mêmes fichiers si besoin
    e.target.value = "";
  };

  const handleUploads = () => {
    let noError = true;
    for (let i = 0; i < imagesUploaded.length; i++) {
      if (!imagesUploaded[i]) {
        const uploaded = handleUpload(images[i], game.id);

        if (!uploaded) {
          setIndexError(i);
          noError = false;
          break;
        } else {
          setImagesUploaded((prev) =>
            prev.map((value, index) => (index === i ? true : value))
          );
        }
      }
    }

    if (noError) {
      showSnackbar("Images uploadés avec succès", "success");
      setImages([]);
      router.push(
        `/${game.type === "base" ? "game" : game.type}s/edit/${game.id}/2`
      );
    }
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
        return false;
      }
    } else {
      return true;
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
      }
    } else {
      showSnackbar("image introuvable", "error");
      return;
    }
    router.refresh();
  };

  const indexErrors = (errors: string[], indexError: number | null) => {
    return errors.map((error: string) => `Image n°${indexError} ${error}`);
  };

  return (
    <div className="flex flex-col items-center gap-y-6">
      <div className="flex flex-col bg-white rounded-lg flex-wrap p-10 gap-y-6 w-full">
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
          {errors?.file && (
            <FormError
              name="file"
              errors={indexErrors(errors.file, indexError)}
            />
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {previews.map((src, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={src}
                alt={`Preview ${index}`}
                width={128}
                height={128}
              />
              <div className="flex items-center gap-x-2">
                {imagesUploaded[index] && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    color={theme.colors.secondary[700]}
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
      <div>
        <ButtonPrimary
          label="Upload les images"
          color={theme.colors.primary[500]}
          onClick={handleUploads}
        />
      </div>
    </div>
  );
}
