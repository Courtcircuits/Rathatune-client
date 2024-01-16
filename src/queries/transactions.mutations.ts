import { useContext } from "react";
import { ToasterContext } from "../contexts/ToastContext";
import { useMutation } from "@tanstack/react-query";
import { RoomContext } from "../contexts/RoomContext";

interface Transaction {
  room_id: string;
  amount: number;
  date: string;
  description: string;
  type: string;
  other_user_id: string;
}

const fetchCreateTransaction = async ({room_id, description, amount, type, other_user_id}: Transaction): Promise<{message: string}> => {
    const formData = new FormData();
    formData.append("room_id", room_id);
    formData.append("title", description);
    formData.append("amount", amount.toString());
    formData.append("type", type);
    formData.append("target_user_id", other_user_id);
    const response = await fetch(import.meta.env.VITE_API_ENDPOINT + "/transaction/create", {
        method: "POST",
        credentials: "include",
        body: formData,
    });
    if (!response.ok) {
        throw new Error("Room not found");
    }
    const data = await response.json();
    return data;
}

export const useCreateTransaction = () => {
  const { trigger_success, trigger_alert } = useContext(ToasterContext);
  const { updateRoom, room } = useContext(RoomContext);
  return useMutation({
    mutationFn: fetchCreateTransaction,
    onSuccess: (data) => {
      trigger_success(data.message);
      if (room) {
        updateRoom(room.id);
      }
    },
    onError: (error) => {
      trigger_alert(error.message);
    },
  })
};
