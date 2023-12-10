import { createContext, useEffect, useState } from "react";
import { ITransaction } from "../components/Transaction";
import { useLocation, useParams } from "react-router-dom";

export interface Room {
  name: string;
  id: string;
  members: string[];
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
  console.log("GETTING ROOM : " + id)
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT + "/room/" + id, {
    method: "GET",
    credentials: "include",
  }
  );
  if (data.status === 400 || data.status === 401) {
    throw new Error("Room not found");
  }
  return (await data.json())
}

const rooms: Room[] = [{
  name: "Vacances  à Tahiti",
  id: "1",
  members: ["You", "Denis", "Ken"],
  transactions: []
}];

export function computeDebts(room: Room): { member: string, amount: number }[] {
  let toReturn: { member: string, amount: number }[] = [];
  for (let member of room.members) {
    toReturn.push({ member: member, amount: 0 });
  }
  for (let transaction of room.transactions) {
    const senderIndex = toReturn.findIndex((value) => value.member === transaction.sender);
    const receiverIndex = toReturn.findIndex((value) => value.member === transaction.receiver);
    toReturn[senderIndex].amount -= transaction.amount;
    toReturn[receiverIndex].amount += transaction.amount;
  }
  return toReturn.sort((a, b) => b.amount - a.amount);
}

export const RoomContext = createContext<{
  room: Room | undefined;
  setRoomId: (id: string) => void;
}>({
  room: rooms[0],
  setRoomId: () => { },
})

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room | undefined>(rooms[0]);
  const params = useParams();
  const [roomId, setRoomId] = useState<string>("1");

  useEffect(() => {
    if (params.id === undefined) return;
    getRoom(params.id).then((data) => {
      console.log(data);
      setRoom(data);
    }).catch((e) => {
      console.log(e);
      setRoom(undefined);
    })
  }, [params])


  return (
    <RoomContext.Provider value={{ room, setRoomId }}>
      {children}
    </RoomContext.Provider>
  )
}