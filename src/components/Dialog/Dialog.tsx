import React, { useEffect, useRef } from "react";
import { Field } from "../../views/Login";
import Button, { IconButton } from "../Button";
import AddIcon from "../../assets/icon/plus-circle";
import CrossIcon from "../../assets/icon/cross";
import { useNavigate } from "react-router-dom";
import { createGroup } from "../../contexts/RoomContext";

export default function Dialog({
    title,
    trigger,
    subtitle,
    children,
    back,
    next,
    setOpen,
    open
}: {
    title: string,
    trigger: React.ReactNode,
    subtitle?: string,
    children: React.ReactNode,
    back?: React.ReactNode,
    next?: React.ReactNode,
    setOpen: (open: boolean) => void,
    open: boolean
}) {

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        })
        return () => {
            document.removeEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    setOpen(false);
                }
            })
        }
    }, [])



    if (!open) {
        return (
            <div onClick={() => setOpen(true)}>
                {trigger}
            </div>
        )
    }
    return (
        <div>
            <div onClick={() => setOpen(true)}>
                {trigger}
            </div>
            {open && <DialogWindow setOpen={setOpen} open={open} title={title} subtitle={subtitle} back={back} next={next}>
                {children}
            </DialogWindow>}
        </div>
    )
}

export function DialogWindow({
    title,
    subtitle,
    children,
    back,
    next,
    setOpen
}: {
    title: string,
    subtitle?: string,
    children: React.ReactNode,
    back?: React.ReactNode,
    next?: React.ReactNode,
    setOpen: (open: boolean) => void,
    open: boolean
}) {
    const backgroundRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dialogRef.current?.contains(event.target as Node)) return;

            setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [backgroundRef, dialogRef]);

    return (
        <div className="z-50 flex flex-col w-screen h-screen fixed bg-tintOpac0 backdrop-blur-sm top-0 left-0 justify-center items-center" ref={backgroundRef}>
            <div ref={dialogRef}>
                <div className="border-1 rounded-tl-sm rounded-tr-sm border-tint300 bg-tint0 px-7 py-6">
                    <section className="py-3">
                        <h3 className="font-extrabold text-3xl mb-2">
                            {title}
                        </h3>
                        <p className="font-light text-tint400">
                            {subtitle}
                        </p>
                    </section>
                    <section>
                        {children}
                    </section>
                </div>
                <div className="border-b-1 border-l-1 border-r-1 rounded-bl-sm rounded-br-sm border-tint300 bg-tint50">
                    <div className="flex flex-row justify-between px-7 py-4">
                        <div className="w-1/3">
                            {back}
                        </div>
                        <div className="w-1/3">
                            {next}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function DialogCreateGroup({
    children
}: {
    children: React.ReactNode,
}) {
    const [groupName, setGroupName] = React.useState("");
    const [groupMembers, setGroupMembers] = React.useState<string[]>([""]);
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    function checkIfValid(): string | boolean {
        if (groupName === "") {
            return "Group name cannot be empty";
        }
        if (groupMembers.length === 1 && groupMembers[0] === "") {
            return true;
        }
        //group member is actually a list of emails
        for (const member of groupMembers) {
            if (member === "") {
                return "You cannot have an empty email";
            }
            if (member.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null) {
                return member + " is not a valid email";
            }
        }
        return true;
    }


    const next = <Button type="secondary" onClick={() => {
        const valid = checkIfValid();
        if (valid === true) {
            createGroup(groupName).then((id) => {
                navigate("/dashboard/" + id);
            })
            setError("");
            setOpen(false);
        } else {
            setError(valid as string);
        }
    }}>Create</Button>;
    const back = <Button type="primary" onClick={() => {
        setOpen(false);
    }}>Cancel</Button>;

    return (<Dialog open={open} setOpen={setOpen} trigger={children} title="Create a group" subtitle="Create a group to share expenses with your friends" next={next} back={back}>
        <div className="py-2">
            <Field label="Group name" placeholder="Group name" type="text" value={groupName} onChange={setGroupName} />
        </div>
        <p className="text-tint500">Invite your friends</p>
        {
            groupMembers.map((_, index) => {
                return (
                    <div key={index} className="flex flex-row items-center justify-between">
                        <div className="w-4/5">
                            <Field placeholder="tonton@gmail.com" type="email" value={groupMembers[index]} onChange={(value: string) => {
                                const newGroupMembers = [...groupMembers];
                                newGroupMembers[index] = value;
                                setGroupMembers(newGroupMembers);
                            }} />
                        </div>
                        <div className="w-1/6">
                            <IconButton small icon={
                                <CrossIcon width={25} height={25} />
                            } type="primary" onClick={() => {
                                const newGroupMembers = [...groupMembers];
                                newGroupMembers.splice(index, 1);
                                setGroupMembers(newGroupMembers);
                            }} />
                        </div>
                    </div>
                )
            })
        }


        <div className="py-2">
            <IconButton text="Add a friend" icon={
                <AddIcon width={25} height={25} />
            } type="primary" onClick={() => {
                setGroupMembers([...groupMembers, ""])
            }} />
        </div>

        <p className="text-warn w-full text-center">{error}</p>
    </Dialog>)
}