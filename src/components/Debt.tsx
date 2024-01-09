import { useContext } from "react";
import { HelpDebt } from "./Help";
import { UserCard } from "./UserCard"
import { AuthContext } from "../contexts/AuthContext";

export default function Debt({
  amount,
  name,
  index,
  amplitude
}: {
  amount: number,
  name: string,
  index: string,
  amplitude: number
}) {
  const { user } = useContext(AuthContext);
  let color = amount > 0 ? "border-warn bg-lightwarn" : "border-green bg-lightgreen";
  if (amount === 0) {
    color = "border-tint400 bg-lighttint400";
  }
  let colorText = amount > 0 ? "text-warn" : "text-green";
  let align = amount < 0 ? "justify-end" : "justify-start";
  if (amount === 0) {
    colorText = "text-tint400";
  }
  const width = (Math.abs(amount) / amplitude) * 100;
  let message;
  if (amount < 0) {
    message = name + " is owed " + amount.toString() + "$";
  } else {
    message = name + " owes to the group " + Math.abs(amount).toString() + "$";
  }
  if (name === user?.name ) {
    if (amount > 0) {
      message = "You owe in total " + amount.toString() + "$";
    } else {
      message = "You are owed in total " + Math.abs(amount).toString() + "$";
    }
  }
  if (amount === 0) {
    message = "You are even with " + name;
  }

  return (
    <li className="flex flex-row items-center justify-between w-full py-4">
      <div className="flex flex-row items-center w-2/12">
        <p className="text-xl font-bold mr-5">{index}.</p>
        <UserCard king={parseInt(index) - 1 === 0} name={name} url={"https://vercel.com/api/www/avatar/?u=" + name.toLowerCase() + "&s=60"} />
      </div>
      <HelpDebt message={message}>
        <div className={"w-12/12 flex flex-row items-center " + align + " hover:cursor-help opacity-40 hover:opacity-100 transition-all ease-linear duration-150 rounded-sm py-1 px-1"}>
          {
            amount < 0 ? null : <div className="w-1/2"></div>
          }
          <div style={
            {
              width: width + "%"
            }
          } className={"h-[30px] border-1 " + color + " rounded-sm"}>
          </div>
          {
            amount <= 0 ? <div className="w-1/2"></div> : <div className="flex-grow-1"></div>

          }
        </div>
      </HelpDebt>
      <p className={"w-1/12 text-right " + colorText}>{amount.toString()}$</p>
    </li>
  )
}
