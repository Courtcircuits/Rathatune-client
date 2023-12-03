import { createContext, useState } from "react";
import { ITransaction } from "../components/Transaction";

export interface Room {
    name: string;
    id: string;
    members: string[];
    transactions: ITransaction[];
}

const rooms: Room[] = [{
  name: "Vacances  à Tahiti",
  id: "general",
  members: ["You", "Denis", "Ken"],
  transactions: [{
    amount: 10,
    date: new Date(),
    receiver: "You",
    sender: "Denis",
    title: "Pizza"
  },
  {
    amount: 14,
    date: new Date(),
    receiver: "You",
    sender: "Denis",
    title: "Pizza 2"
  },
  {
    amount: 32,
    date: new Date(),
    sender: "You",
    receiver: "Ken",
    title: "Chalet Chamoniard"
  }
//   {
//     amount: 14,
//     date: new Date(),
//     receiver: "You",
//     sender: "Denis",
//     title: "Pizza 2"
//   },
//   {
//     amount: 14,
//     date: new Date(),
//     receiver: "You",
//     sender: "Denis",
//     title: "Pizza 2"
//   },
//   {
//     amount: 14,
//     date: new Date(),
//     receiver: "You",
//     sender: "Denis",
//     title: "Pizza 2"
//   }
  ]
}];

export function computeDebts(room: Room): {member: string, amount: number}[] {
    let toReturn: {member: string, amount: number}[] = [];
    for (let member of room.members) {
        toReturn.push({member: member, amount: 0});
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
    room: Room;
    setRoom: (room: Room) => void;
}>({
    room: rooms[0],
    setRoom: () => {},
})

export function RoomProvider({ children }: { children: React.ReactNode }) {
    const [room, setRoom] = useState<Room>(rooms[0]);
    return (
        <RoomContext.Provider value={{ room, setRoom }}>
            {children}
        </RoomContext.Provider>
    )
}