import { useContext, useEffect, useState } from "react";
import Button, { IconButton } from "../Button";
import Dialog from "./Dialog";
import LinkIcon from "../../assets/icon/link";
import { RoomContext, getLinkToRoom, sendInvitation } from "../../contexts/RoomContext";
import MembersField from "../Fields/MembersField";

export default function DialogInvitation({children}: {children: React.ReactNode}) {
    const [open, setOpen] = useState(false);
    const [textButton, setTextButton] = useState("Copy link");
    const [email, setEmail] = useState("");
    const [link, setLink] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    const {room} = useContext(RoomContext);

    const next = <Button type="secondary" onClick={() => {
        setOpen(false);
    }}>Ok !</Button>

    useEffect(() => {
        if (open) {
            if (room == undefined) {
                return;
            }
            getLinkToRoom(room.id).then((link) => {
                setLink(import.meta.env.VITE_CLIENT_ENDPOINT+"/join/"+link);
            })
        }
    }, [room, open])


    return (
        <Dialog open={open} setOpen={setOpen} next={next} trigger={children} title="Invite a friend !" subtitle="Let's scam one more friend....">
            <div className="py-2">
                <p>Send an invitation by email</p>
                <div className="flex flex-row justify-between items-center">
                    <span className="w-[75%]">
                <MembersField member={email} setMember={setEmail} />
                </span>
                <span className="w-[24%]">
                <Button type="primary" onClick={() => {
                    if(room == undefined) return;
                    sendInvitation(email, room.id).then(() => {
                        setEmail("");
                    })
                }}>Send</Button>
                </span>
                </div>
            </div>
            <div className="flex-row justify-between flex items-center py-2">
                <div className="w-1/3 h-[1px] bg-tint300"></div>
                <p className="text-tint500">Or</p>
                <div className="w-1/3 h-[1px] bg-tint300"></div>
            </div>
            <div className="py-2">
                <p>Send this link to your friend to invite him to the group !</p>
                <IconButton type="primary" onClick={() =>{
                    navigator.clipboard.writeText(link);
                    setTextButton("Copied !");
                }} text={textButton} icon={<LinkIcon width={25} height={25} />} />
            </div>           
        </Dialog>
    )
}
