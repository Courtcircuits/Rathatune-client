import DollarIcon from "../assets/icon/dollar";
import SettingsIcon from "../assets/icon/settings";
import { IconButton } from "../components/Button";
import Filters from "../components/Filters";
import Transaction, { ITransaction } from "../components/Transaction";
import { UserCard } from "../components/UserCard";

export interface Room {
    name: string;
    id: string;
    members: string[];
    transactions: ITransaction[];
}

function Dashboard({ room }: { room: Room }) {
    return (
        <div className="pt-[90px]">
            <Filters />
            <div className="px-[10%]">
                <div className="py-10 flex flex-row w-full items-center">
                    <div className="w-2/3">
                        <h1 className="text-4xl font-primary font-black">
                            {room.name}
                        </h1>
                        <p className="text-tint500 text-sm">Historic of all transactions involving you.</p>
                    </div>
                    <div className="w-1/3 flex flex-row justify-between">
                        <div className="flex-1 mr-2">
                            <IconButton onClick={() => { }} text="Add expense" type="primary" icon={
                                <DollarIcon width={25} height={25} />
                            } />
                        </div>
                        <div className="flex-1">
                            <IconButton onClick={() => { }} text="Manage" type="secondary" icon={
                                <SettingsIcon width={25} height={25} />
                            } />
                        </div>

                    </div>
                </div>
                <div className="my-2">
                    <UserList users={room.members} />
                </div>
                {
                    room.transactions.map(transaction => <Transaction transaction={transaction} />)
                }
                
            </div>

        </div>
    )
}



function UserList({ users }: { users: string[] }) {
    return (
        <div className="flex flex-row items-center">
            <div className="flex flex-col items-center mr-5 group hover:cursor-pointer">
                <div className="w-11 h-11 rounded-full border-1 flex items-center justify-center group-hover:bg-tint900">
                    <p className="flex items-center justify-center border-0 group-hover:text-tint50">
                        +
                    </p>
                </div>

                <p className="text-sm truncate">Invite</p>
            </div>

            <div className='mx-6 w-[1px] h-10 bg-tint400 '></div>
            {
                users.map(user => <div className="mx-3"><UserCard name={user} url={"https://vercel.com/api/www/avatar/?u=" + user + "&s=60"} /></div>)
            }
        </div>
    )
}

export default Dashboard;