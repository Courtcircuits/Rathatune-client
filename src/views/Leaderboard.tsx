import { useContext } from "react";
import { RoomContext, computeDebts } from "../contexts/RoomContext";
import RoomLayout from "../components/RoomLayout";
import Debt from "../components/Debt";

export default function Leaderboard(){
    const {room} = useContext(RoomContext);
    if(!room){
        return <div></div>
    }
    const debts = computeDebts(room);
    const amplitude = debts[0].amount - debts[debts.length-1].amount;
    return (
        <RoomLayout subtitle="How much do you owe to your friends ?">
            <ol className="my-7">
                {
                    debts.map((debt, index)=> <Debt amplitude={amplitude} key={index} amount={debt.amount} name={debt.member} index={(index+1).toString()}/>)
                }
            </ol>
        </RoomLayout>
    )
}