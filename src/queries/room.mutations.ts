import { useContext } from "react";
import { RoomContext } from "../contexts/RoomContext";
import { useMutation } from "@tanstack/react-query";
import { ToasterContext } from "../contexts/ToastContext";

export interface MutateRoomNameReturn {
  message: string
  data: DataRoom
}

export interface DataRoom {
  room_id: number
  title: string
}


const fetchUpdateRoomName = async ({ roomId, name }: { roomId: string, name: string }): Promise<MutateRoomNameReturn> => {
  const response = await fetch(import.meta.env.VITE_API_ENDPOINT + "/room/" + roomId + "/update", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });
  const data = await response.json();
  return data;
}

export const useMutateRoomName = () => {
  const { updateRoom } = useContext(RoomContext);
  const { trigger_success, trigger_alert } = useContext(ToasterContext);
  return useMutation({
    onSuccess: (data: MutateRoomNameReturn) => {
      updateRoom(data.data.room_id.toString());
      trigger_success("Room updated !");
    },
    onError: (error: any) => {
      trigger_alert(error.message);
    },
    mutationFn: fetchUpdateRoomName,
  });
}
