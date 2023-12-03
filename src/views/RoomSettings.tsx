import { useContext } from "react";
import { RoomContext } from "../contexts/RoomContext";
import Button from "../components/Button";

export default function RoomSettings() {
    const { room } = useContext(RoomContext);
    return (
        <div className="px-[10%] py-10">
            <h1 className="text-4xl font-primary font-black">
                {room.name}
            </h1>
            <p className="text-tint500 text-sm">Manage your room here.</p>
            <div className="py-5">
                <SettingCard title="Update the name of the room" description="Update the name of the room. This time pick a smarter name..." instruction="The name can't be more than 50 characters long. Otherwise, you won't remember it.">
                    <input className="w-full bg-tint0 border-1 border-tint400 rounded-sm px-4 py-2" type="text" placeholder="test" />
                </SettingCard>

                <SettingCard type="warning" title="Update the name of the room" description="Update the name of the room. This time pick a smarter name..." instruction="The name can't be more than 50 characters long. Otherwise, you won't remember it.">
                    <input className="w-full bg-tint0 border-1 border-tint400 rounded-sm px-4 py-2" type="text" placeholder="test" />
                </SettingCard>
            </div>
        </div>
    )
}

function SettingCard({ title, description, children, instruction, type }: { title: string, description: string, children: React.ReactNode, instruction: string, type?: "warning" | "normal" }) {
    let colors = "border-tint400";
    if (type === "warning") {
        colors = "border-warn";
    }
    return (
        <div className="py-5">
            <div className={"w-full bg-tint100 border-1 rounded-tl-sm rounded-tr-sm px-4 py-5 " + colors}>
                <h2 className="text-2xl font-primary font-medium my-1">{title}</h2>
                <p className="text-tint500 text-sm font-light">{description}</p>
                <div className="mt-4">
                    {children}
                </div>
            </div>
            <div className={"w-full rounded-bl-sm rounded-br-sm bg-0 py-5 px-4 flex flex-row items-center border-l-1 border-r-1 border-b-1 "+ colors}>
                <p className="font-light text-sm w-2/3">{instruction}</p>
                <div className="w-1/3">
                    <Button type={type === "warning" ? "warning" : "secondary"} onClick={() => { }}><p>Update</p></Button>
                </div>
            </div>
        </div>
    )
}