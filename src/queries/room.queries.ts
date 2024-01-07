import { useQuery } from "@tanstack/react-query";

type Member = {
  name: string;
  avatar: string;
}

type RoomSummary ={
  room_id: number;
  name: string;
  sold: number;
  members: Member[];
}

const fetchRoomSummary = async () => {
  const response = await fetch(import.meta.env.VITE_API_ENDPOINT+"/all", {
    credentials: "include",
  });
  const data = await response.json();
  return data;
}


export const useRoomSummary = () => {
  const { data, error } = useQuery<RoomSummary[]>({
    queryKey: ["room-summary"],
    queryFn: fetchRoomSummary,
  });

  return { data, error };
}

