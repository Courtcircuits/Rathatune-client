import Check from "../../assets/icon/check";
import CrossIcon from "../../assets/icon/cross";
import LogOutIcon from "../../assets/icon/log-out";
import SettingsIcon from "../../assets/icon/settings";
import { IconButton } from "../Button";
import { DropdownMenu, SectionSeparator } from "./Dropdown";

export default function DropdownAccount() {
    const user_name = "John Doe"; //will be replaced by a useContext

    return (
        <DropdownMenu>
            <p className="text-tint600 mx-5 text-sm">{user_name}</p>
            <SectionSelector section_name="Dashboard" icon={<></>} />
            <SectionSelector section_name="Settings" icon={<SettingsIcon width={20} height={20} />} />
            <SectionSelector section_name="Log out" danger icon={<LogOutIcon width={20} height={20} />} />
            <div className="mx-5">
                <SectionSeparator />

                <p className="text-tint600 text-sm">Invitations</p>
                <Invitation from="John Doe" room="🌴 Vacances  à Tahiti" />
                <Invitation from="John Doe" room="🌴 Vacances  à Tahiti" />
            </div>
        </DropdownMenu>
    )
}

function SectionSelector({ section_name, icon, danger }: { section_name: string, icon: React.ReactNode, danger?: boolean }) {
    const dangerStyle = "text-warn stroke-warn hover:bg-lightwarn";
    let colors = "text-tint600 stroke-tint400 hover:text-tint900 hover:bg-tint200";
    if (danger) {
        colors = dangerStyle;
    }

    return (
        <div className={"flex flex-row items-center justify-between group hover:cursor-pointer my-2 py-3 px-5 duration-100 ease-linear transition-colors " + colors}>
            <p className="mr-[50px]">{section_name}</p>
            {icon}
        </div>
    )
}

function Invitation({ from, room }: { from: string, room: string }) {
    return (
        <div className="flex flex-row py-5 border-b-1 border-b-tint300 last:border-b-0">
            <p className="w-3/4"><b>{from}</b> invited you to <b>{room}</b></p>
            <div className="w-1/4 flex flex-row justify-between">
                <div className="w-[50px] h-[20px]">
                    <IconButton onClick={() => { }} text="" type="accept" icon={<Check height={20} width={20} />} />
                </div>

                <div className="w-[50px] h-[20px]">
                    <IconButton onClick={() => { }} text="" type="warning" icon={<CrossIcon height={20} width={20} />} />
                </div>
            </div>
        </div>
    )
}