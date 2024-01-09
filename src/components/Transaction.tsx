import { UserCard } from "./UserCard";

export interface ITransaction {
  sender: string;
  receiver: string;
  amount: number;
  date: Date;
  title: string;
}

export default function Transaction({ transaction }: { transaction: ITransaction }) {
  return (
    <div className="flex flex-row w-full items-center py-10 border-b-1 border-b-tint400">
      <div className="pr-10">
        <UserCard name={transaction.sender} url={"https://vercel.com/api/www/avatar/?u" + transaction.sender + "&s=60"} />
      </div>
      <div className="flex flex-row w-full ">
        <div className="pr-5">
          <h4 className="text-xl font-bold">{transaction.title}</h4>
          <p>for <u>{transaction.receiver}</u></p>
        </div>
        <div className="flex-grow border-b-1 border-dashed"></div>
        <div className="pl-5">
          <p className="text-warn font-bold text-xl">{transaction.amount} €</p>
          <p className="text-xs">{new Date(transaction.date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
