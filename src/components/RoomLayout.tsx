import { useContext } from "react";
import { RoomContext } from "../contexts/RoomContext";
import DialogCreateTransaction from "./Dialog/DialogTransaction";
import { IconButton } from "./Button";
import DollarIcon from "../assets/icon/dollar";
import DialogInvitation from "./Dialog/DialogInvitation";
import { UserCard } from "./UserCard";

export default function RoomLayout({ subtitle, children }: { children: React.ReactNode, subtitle: string }) {
    const { room } = useContext(RoomContext);
    if (room == undefined) {
        return (<div className="px-[10%]">
            <div className="py-10 flex flex-row w-full items-center">
                <div className="w-2/3">
                    <h1 className="text-4xl font-primary font-black">
                        You can't access this room.
                    </h1>
                    <p className="text-tint500 text-sm">Please select another room...</p>
                </div>
            </div>

        </div>)
    }
    return (<div className="px-[10%]">
        <div className="py-10 flex flex-row w-full items-center">
            <div className="w-2/3">
                <h1 className="text-4xl font-primary font-black">
                    {room.name}
                </h1>
                <p className="text-tint500 text-sm">{subtitle}</p>
            </div>
            <div className="w-1/3 flex flex-row justify-end">
                <DialogCreateTransaction>
                    <div className="w-[200px] mr-2">
                        <IconButton onClick={() => { }} text="Add expense" type="secondary" icon={
                            <DollarIcon width={25} height={25} />
                        } />
                    </div>
                </DialogCreateTransaction>
            </div>
        </div>
        <div className="my-2">
            <UserList users={room.members} />
        </div>
        {
            children
        }

    </div>)
}

function UserList({ users }: { users: string[] }) {
    return (
        <div className="flex flex-row items-center">
            <DialogInvitation>
                <button className="flex flex-col items-center mr-5 group hover:cursor-pointer">
                    <div className="w-11 h-11 rounded-full border-1 flex items-center justify-center group-hover:bg-tint900">
                        <p className="flex items-center justify-center border-0 group-hover:text-tint50">
                            +
                        </p>
                    </div>
                    <p className="text-sm truncate">Invite</p>
                </button>
            </DialogInvitation>

            <div className='mx-6 w-[1px] h-10 bg-tint400 '></div>
            {
                users.map((user) => <div key={user} className="mx-3"><UserCard name={user} url={"https://vercel.com/api/www/avatar/?u=" + user + "&s=60"} /></div>)
            }
        </div>
    )
}