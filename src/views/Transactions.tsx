import { useContext } from "react"
import DollarIcon from "../assets/icon/dollar"
import { IconButton } from "../components/Button"
import DialogInvitation from "../components/Dialog/DialogInvitation"
import DialogCreateTransaction from "../components/Dialog/DialogTransaction"
import Transaction from "../components/Transaction"
import { RoomContext } from "../contexts/RoomContext"
import RoomLayout from "../components/RoomLayout"

export default function Transactions() {
    const {room} = useContext(RoomContext);
    return (
        <RoomLayout subtitle="Historic of all transactions involving you.">
            <div>
            {
                room.transactions.map((transaction, index) => <Transaction key={index} transaction={transaction} />)
            }
            </div>
        </RoomLayout>
    )
}

