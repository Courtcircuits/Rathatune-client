import { useContext } from "react"
import DollarIcon from "../assets/icon/dollar"
import Transaction from "../components/Transaction"
import { RoomContext } from "../contexts/RoomContext"
import RoomLayout from "../components/RoomLayout"
import { AuthContext } from "../contexts/AuthContext"

export default function Transactions() {
  const { room } = useContext(RoomContext);
  const { user } = useContext(AuthContext);

  const noTransactions = (
    <div className="flex flex-col items-center justify-center">
      <DollarIcon width={100} height={100} />
      <p className="text-tint500 text-sm">You don't have any transactions yet.</p>
      <p className="text-tint500 text-sm">Create one by clicking on the button below.</p>
    </div>
  )

  console.log(room?.transactions)

  return (
    <RoomLayout subtitle="Historic of all transactions involving you.">
      <div>
        {
          room != undefined ? 
          room.transactions == undefined ? (
          noTransactions
          ):
          room.transactions.length === 0 ? (
            noTransactions
          ) : room.transactions.filter((transaction)=> transaction.sender != user.name || transaction.receiver != user.name ).map((transaction, index) => <Transaction key={index} transaction={transaction} />)
            : (
              <p></p>
            )
        }
      </div>
    </RoomLayout>
  )
}

