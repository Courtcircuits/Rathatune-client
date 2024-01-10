import { useEffect, useState } from "react";
import Header from "../components/Header"
import { Link } from "react-router-dom";
import { DialogCreateGroup } from "../components/Dialog/Dialog";
import Button from "../components/Button";
import { useRoomSummary } from "../queries/room.queries";

type Room = {
  name: string,
  id: string,
  members: string[],
  sold: number
}

const rooms_mock: Room[] = [
  {
    sold: 100,
    name: "Room 1",
    id: "1",
    members: [
      "https://i.pravatar.cc/150?img=1",
      "https://i.pravatar.cc/150?img=2",
      "https://i.pravatar.cc/150?img=3",
      "https://i.pravatar.cc/150?img=4",
    ]
  }
]

export default function HomeDashboard() {
  const [sold, setSold] = useState(0);
  const [rooms, setRooms] = useState<Room[]>(rooms_mock);
  const { data } = useRoomSummary();

  document.title = "Dashboard - Ratathune";

  useEffect(() => {
    if (data) {
      console.log(data);
      setRooms(data.map((room) => {
        return {
          sold: room.sold,
          id: room.room_id.toString(),
          name: room.name,
          members: room.members.map((member) => {
            return member.avatar
          })
        }
      }));
      setSold(data.reduce((acc, room) => {
        return acc + room.sold
      }, 0))
    }
  }, [data])

  return (
    <>
      <Header />
      <div className="pt-[90px] px-[5%] md:px-[10%] w-full">
        <section className="text-center py-10">
          <h2 className="font-bold text-xl">{
            sold === 0 ? `You have no debt` :
            sold > 0 ? `You are owed in total` : `You owe in total`
          }</h2>
          <h1 className="font-bold text-warn text-4xl py-3">{
            sold >= 0 ? `$${sold}` : `$${-sold}`
          }</h1>
          <h2 className="font-bold text-xl">{
            sold >= 0 ? `gg... you're not a rat` : `gg... you're a rat`
          }</h2>
        </section>
        <section className="px-[0%] md:px-[10%] w-full flex-col flex items-center justify-center">
          {
            rooms.map((room, index) => {
              return (
                <RoomCard key={index} {...room} />
              )
            })
          }
          <div className="w-full md:w-1/2 xl:1/3">
          <DialogCreateGroup>
            {/* <p className="mr-3 text-lg">Create a new group</p> */}
            <div className="my-4 w-full">
              {/* <AddIcon width={25} height={20} /> */}
              <Button type="primary" style="md:px-5">+ Create a new group</Button>
            </div>
          </DialogCreateGroup>
          </div>
        </section>
      </div>
    </>
  );
}

function RoomCard({ name, id, members, sold }: Room) {
  return (
    <Link to={"/dashboard/" + id} className="w-full border-tint300 my-4 rounded-sm px-7 pt-5 pb-8 border-1 flex flex-col hover:bg-tint200">
      <div className="flex flex-row w-full justify-between items-center">
        <h2 className="font-bold text-xl">{name}</h2>
        <div className="flex flex-row-reverse items-center">
          {members.slice(0, 3).map((member, index) => {
            return (
              <div key={index} className={`flex justify-end items-end ml-[-10px]`}>
                <img className="w-11 h-11 rounded-full" src={member} alt="Profile picture" />
              </div>
            )
          })}
        </div>
      </div>
      <p className="font-bold text-xl text-warn border-1 border-warn px-3 py-2 w-fit rounded-full">${sold}</p>
    </Link>
  )
}

