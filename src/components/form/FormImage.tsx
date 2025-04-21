"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "@/components/ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import { uploadImageGame } from "@/lib/api/server/game";
import { useSnackbarContext } from "@/components/provider/SnackbarProvider";

export default function FormImage({ gameId }: { gameId: number }) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagesUploaded, setImagesUploaded] = useState<boolean[]>([]);
  const { showSnackbar } = useSnackbarContext();

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
    for (let i = 0; i < imagesUploaded.length; i++) {
      const uploaded = handleUpload(images[i], gameId);

      if (!uploaded) {
        break;
      } else {
        setImagesUploaded((prev) =>
          prev.map((value, index) => (index === i ? true : value))
        );
      }
    }
  };

  const handleUpload = async (image: File, gameId: number) => {
    const formData = new FormData();
    formData.set("file", image);
    const response = await uploadImageGame(formData, gameId);
    if (!response.ok) {
      if (response.message) {
        showSnackbar(response.message, "error");
        return false;
      }
    } else {
      return true;
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    setImagesUploaded((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="flex flex-col items-center gap-y-6">
      <div className="flex flex-col bg-white rounded-lg flex-wrap p-10 gap-y-6 w-full">
        <div className="flex items-center">
          <label
            htmlFor="images"
            className="bg-primary-700 text-white rounded-full px-5 py-1.5 cursor-pointer hover:brightness-75 inline-flex items-center gap-2"
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
              {imagesUploaded[index] ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  color={theme.colors.secondary[700]}
                />
              ) : (
                <ButtonPrimary
                  label=""
                  color={theme.colors.primary[700]}
                  onClick={() => removeImage(index)}
                  icon={faTrash}
                />
              )}
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
