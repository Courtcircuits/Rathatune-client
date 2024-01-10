import { useContext } from "react";
import Rat from "../assets/rat.png";
import { RoomContext } from "../contexts/RoomContext";

export function UserCard({
  name,
  url,
  king,
  onlyName,
}: {
  name: string,
  url: string,
  king?: boolean,
  onlyName?: boolean
}) {
  const { room } = useContext(RoomContext);
  url = room?.members.find((user) => user.name === name)?.profile_picture || url;

  if (onlyName) {
    return (
      <p className="text-xl font-bold mr-5">{name}</p>
    )
  }

  if (name === "Rat") {
    return (
      <img className="w-11 h-11 rounded-full " src={Rat} alt="Profile picture" />
    )
  }
  if (king) {
    return (
      <div title={name} className="flex flex-col relative items-center afuserster:content-[attr(title)] after:text-sm after:truncate">
        <img className="w-11 h-11 rounded-full " src={url} alt="Profile picture" />
        <p className="absolute bottom-4 right-[-2px] text-xl">👑</p>
      </div>
    )
  }
  return (
    <div title={name} className="flex flex-col items-center after:content-[attr(title)] after:text-sm after:truncate after:break-words after:w-[60px] w-11">
      <img className="w-11 h-11 rounded-full " src={url} alt="Profile picture" />
    </div>
  )
}
