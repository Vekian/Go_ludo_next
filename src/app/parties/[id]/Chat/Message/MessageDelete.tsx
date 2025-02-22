import { useSnackbarContext } from "@/components/provider/SnackbarProvider";
import ButtonInput from "@/components/ui/button/ButtonInput";
import { Message } from "@/interfaces/party.interface";
import { deleteMessage } from "@/lib/api/server/chat";
import { theme } from "@/theme/theme";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import React from "react";

export default function MessageDelete({ message }: { message: Message }) {
  const router = useRouter();
  const { showSnackbar } = useSnackbarContext();
  const handleDelete = async () => {
    const response = await deleteMessage(message.id);
    if (response.ok) {
      router.refresh();
    }
    showSnackbar(response.message, response.ok ? "success" : "error");
  };
  return (
    <div>
      <ButtonInput
        label=""
        icon={faTrash}
        color={theme.colors.primary[700]}
        onClick={handleDelete}
      />
    </div>
  );
}
