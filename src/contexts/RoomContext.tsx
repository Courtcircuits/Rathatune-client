import { createContext, useEffect, useState } from "react";
import { ITransaction } from "../components/Transaction";
import { useNavigate, useParams } from "react-router-dom";

export interface Room {
  name: string;
  id: string;
  isAdmin: boolean;
  members: {
    name: string,
    id: string,
    profile_picture: string,
  }[];
  transactions: ITransaction[];
}

export async function getLinkToRoom(room_id: string): Promise<string> {
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT + "/room/" + room_id + "/invite_code", {
    method: "GET",
    credentials: "include",
  });
  if (data.status === 400 || data.status === 401) {
    throw new Error("Room not found");
  }
  return (await data.json()).invite_code;

}

export async function getRoom(id: string): Promise<Room> {
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT + "/room/" + id, {
    method: "GET",
    credentials: "include",
  }
  );
  if (data.status === 400 || data.status === 401 || data.status === 404) {
    throw new Error("Room not found");
  }
  return (await data.json())
}

const rooms: Room[] = [{
  name: "Vacances  à Tahiti",
  id: "1",
  isAdmin: false,
  members: [],
  transactions: []
}];

export function computeDebts(room: Room): { member: string, amount: number }[] {
  let toReturn: { member: string, amount: number }[] = [];
  for (let member of room.members) {
    toReturn.push({ member: member.name, amount: 0 });
  }
  for (let transaction of room.transactions) {
    const senderIndex = toReturn.findIndex((value) => value.member === transaction.sender);
    const receiverIndex = toReturn.findIndex((value) => value.member === transaction.receiver);
    toReturn[senderIndex].amount -= transaction.amount;
    toReturn[receiverIndex].amount += transaction.amount;
  }
  return toReturn.sort((a, b) => b.amount - a.amount);
}


export async function sendInvitation(email: string, roomId: string): Promise<void> {
  const formData = new FormData();
  formData.append("room_id", roomId);
  formData.append("receiver", email);
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT + "/invite/send", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (data.status === 400 || data.status === 401) {
    throw new Error("Room not found");
  }

}

export async function createGroup(groupName: string): Promise<string> {
  const formData = new FormData();
  formData.append("name", groupName);
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT + "/room/create", {
    method: "POST",
    credentials: "include",
    body: formData,
  })
  if (data.status === 400 || data.status === 401) {
    throw new Error("Room not found");
  }
  return (await data.json()).room.id;
}



export const RoomContext = createContext<{
  room: Room | undefined;
  isLoading: boolean;
  setRoomId: (id: string) => void;
  updateRoom: (room_id: string) => void;
}>({
  room: rooms[0],
  setRoomId: () => { },
  isLoading: false,
  updateRoom: (room_id) => { console.log("update room " + room_id) }
})

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room | undefined>(rooms[0]);
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_, setRoomId] = useState<string>("1");

  // update room from id
  const updateRoom = (room_id: string) => {
    setIsLoading(true);
    getRoom(room_id || "").then((data) => {
      setIsLoading(false);
      setRoom(data);
    }).catch((e) => {
      console.log(e);
      navigate("/dashboard");
      setRoom(undefined);
    })
  }

  useEffect(() => {
    console.log(params);
    if (params.id === undefined) return;
    updateRoom(params.id);
  }, [params])


  return (
    <RoomContext.Provider value={{ room, setRoomId, isLoading, updateRoom }}>
      {children}
    </RoomContext.Provider>
  )
}
