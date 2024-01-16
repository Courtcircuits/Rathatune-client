import { useContext } from "react";
import Reimbursment from "../components/Reimbursment";
import RoomLayout from "../components/RoomLayout";
import { RoomContext, computeReimbursmentsSuggestions } from "../contexts/RoomContext";
import { AuthContext } from "../contexts/AuthContext";

export default function Reimbursments(){
  const {room} = useContext(RoomContext);
  const {user} = useContext(AuthContext);
  if (room === undefined) return <></>;
  const reimbursments = computeReimbursmentsSuggestions(room, user.id);
  console.log(reimbursments);
  return (
  <RoomLayout subtitle="Reimburse your friends easily.">
    {
      reimbursments.length === 0 ? <p className="my-16 text-center text-lg text-tint500">No reimbursments to do.</p> :
      reimbursments.map((reimbursment, index) => {
        return <Reimbursment key={index} recipient={reimbursment.recipient} amount={reimbursment.amount}/>
      })
    }
  </RoomLayout>
  )
}
