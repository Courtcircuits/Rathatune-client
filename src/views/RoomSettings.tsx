import { useContext, useState } from "react";
import { RoomContext } from "../contexts/RoomContext";
import Button from "../components/Button";
import { useMutateDestroyRoom, useMutateLeaveRoom, useMutateRoomName } from "../queries/room.mutations";

export default function RoomSettings() {
  const { room } = useContext(RoomContext);
  const [roomName, setRoomName] = useState(room != undefined ? room.name : "");
  const { mutate: mutateRoomName } = useMutateRoomName();
  const { mutate: mutateLeaveRoom } = useMutateLeaveRoom();
  const { mutate: mutateDeleteRoom } = useMutateDestroyRoom();

  return (
    <div className="px-[10%] py-10">
      <h1 className="text-4xl font-primary font-black">
        {room?.isAdmin ? "👑 " : ""}{room != undefined ? room.name : "You can't access this room."}
      </h1>
      {
        room != undefined ? (<><p className="text-tint500 text-sm">Manage your room here.</p>
          <div className="py-5">
          {
            room.isAdmin &&
            <SettingCard action_label="update" title="Update the name of the room" description="Update the name of the room. This time pick a smarter name..." instruction="The name can't be more than 50 characters long. Otherwise, you won't remember it." onSubmit={() => {
              mutateRoomName({ roomId: room.id, name: roomName });
            }}>
              <input className="w-full bg-tint0 border-1 border-tint400 rounded-sm px-4 py-2" type="text" placeholder="Your room name" value={roomName} onChange={(e) => { setRoomName(e.target.value) }} />
            </SettingCard>
          }
          {
            !room.isAdmin &&
            <SettingCard action_label="Leave" type="warning" title="Leave the room" description="Leave the room, it will delete all the transactions involving you." instruction="Tips : leave the country aswell and asap" onSubmit={() => {
              mutateLeaveRoom({ roomId: room.id });
            }}>
            </SettingCard>
          }
            {
              room.isAdmin &&
            <SettingCard action_label="Delete" type="warning" title="Delete this room" description="If you delete your room, you won't be able to make it come back." instruction="Farewell and goodbye." onSubmit={() => {
              mutateDeleteRoom({ roomId: room.id });
            }}>
            </SettingCard>
            }
          </div></>) : (
          <p></p>
        )
      }
    </div>
  )
}

export function SettingCard({
  title,
  description,
  children,
  instruction,
  type,
  action_label,
  custom_button,
  onSubmit = () => { }
}:
  {
    action_label: string,
    title: string,
    description: string,
    children: React.ReactNode,
    instruction: string,
    type?: "warning" | "normal",
    custom_button?: JSX.Element,
    onSubmit: () => void
  }) {
  let bg_color = "bg-tint100 ";
  let border_color = "border-tint400";
  if (type === "warning") {
    bg_color = "bg-lightwarn ";
    border_color = "border-warn";
  }
  return (
    <div className="py-5">
      <div className={"w-full border-1 rounded-tl-sm rounded-tr-sm px-4 py-5 " + bg_color + border_color}>

        <h2 className="text-2xl font-primary font-medium my-1">{title}</h2>
        <p className="text-tint500 text-sm font-light">{description}</p>
        <div className="mt-4">
          {children}
        </div>


      </div>
      <div className={"w-full rounded-bl-sm rounded-br-sm bg-0 py-5 px-4 flex flex-row items-center border-l-1 border-r-1 border-b-1 " + border_color}>
        <p className="font-light text-sm w-2/3">{instruction}</p>
        <div className="w-1/3">
          {
            custom_button != undefined ? custom_button : (
              <Button type={type === "warning" ? "warning" : "secondary"} onClick={onSubmit}><p>{action_label}</p></Button>)
          }
        </div>
      </div>
    </div>
  )
}
