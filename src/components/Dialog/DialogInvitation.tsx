import { useState } from "react";
import Button, { IconButton } from "../Button";
import Dialog from "./Dialog";
import LinkIcon from "../../assets/icon/link";
import { Field } from "../../views/Login";

export default function DialogInvitation({children}: {children: React.ReactNode}) {
    const [open, setOpen] = useState(false);
    const [textButton, setTextButton] = useState("Copy link");
    const [email, setEmail] = useState("");
    const next = <Button type="secondary" onClick={() => {
        setOpen(false);
    }}>Ok !</Button>
    return (
        <Dialog open={open} setOpen={setOpen} next={next} trigger={children} title="Invite a friend !" subtitle="Let's scam one more friend....">
            <div className="py-2">
                <p>Send an invitation by email</p>
                <div className="flex flex-row justify-between items-center">
                    <span className="w-[75%]">
                <Field placeholder="friend@gmail.com" type="email" value={email} onChange={setEmail} />
                </span>
                <span className="w-[24%]">
                <Button type="primary" onClick={() => {
                    console.log("send email to "+email);
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
                    navigator.clipboard.writeText("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                    setTextButton("Copied !");
                }} text={textButton} icon={<LinkIcon width={25} height={25} />} />
            </div>           
        </Dialog>
    )
}