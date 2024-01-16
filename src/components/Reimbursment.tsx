import { useContext } from "react";
import RightArrow from "../assets/icon/arrow-right";
import { Member, RoomContext } from "../contexts/RoomContext";
import { useCreateTransaction } from "../queries/transactions.mutations";
import { IconButton } from "./Button";

export interface ReimbursmentProps {
  recipient: Member;
  amount: number;
}

export default function Reimbursment({
  recipient,
  amount,
}: ReimbursmentProps){
  const {mutate} = useCreateTransaction();
  const {room} = useContext(RoomContext);
  return(
    <div className="flex flex-row w-full items-center py-10 border-b-1 border-b-tint400">
      <div className="flex flex-row items-center">
        <img
          className="w-10 h-10 rounded-full mr-2"
          src={recipient.profile_picture}
          alt="profile"
        />
        <span>
        <em className="text-lg font-semibold not-italic">You</em>
        <p>Owe</p>
        <em className="text-lg font-semibold not-italic">{recipient.name}</em>
        </span>
      </div>
      <div className="flex-grow border-b-1 border-dashed"></div>
      <p className="text-lg font-semibold text-warn ml-3">
        {amount.toFixed(2)}$
      </p>
      <span className="w-[150px] mx-3">
        <IconButton invert icon={
        <RightArrow width={12} height={14} />
      } text="Reimburse"
      type="primary"
      onClick={() => {
        mutate({
          other_user_id: recipient.id,
          amount: amount,
          description: "Reimbursement",
          type: "Expense",
          room_id: room?.id as string,
          date: new Date().toISOString()
        })
      }}
      />
      </span>
    </div>
  )
}
