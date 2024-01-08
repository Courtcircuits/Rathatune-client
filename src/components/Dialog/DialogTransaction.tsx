import { useContext, useState } from "react";
import Button from "../Button";
import Dialog from "./Dialog";
import { Field } from "../Field";
import SelectButton, { SelectButtonSearch } from "../SelectButton";
import { RoomContext } from "../../contexts/RoomContext";
import { AuthContext } from "../../contexts/AuthContext";
import { ToasterContext } from "../../contexts/ToastContext";

export async function createTransaction(room_id: string, description: string, amount: number, type: string, other_member: string) {
    const formData = new FormData();
    formData.append("room_id", room_id);
    formData.append("title", description);
    formData.append("amount", amount.toString());
    formData.append("type", type);
    formData.append("target_user_id", other_member);
    const data = await fetch(import.meta.env.VITE_API_ENDPOINT + "/transaction/create", {
        method: "POST",
        credentials: "include",
        body: formData,
    });
    if (data.status === 400 || data.status === 401) {
        throw new Error("Room not found");
    }
}

export default function DialogCreateTransaction({
    children
}: {
    children: React.ReactNode
}) {
    const { room, updateRoom } = useContext(RoomContext);
    const { user } = useContext(AuthContext);
    const members = room?.members?.filter((member) => member.id !== user.id.toString()) || [];
    const [otherMember, setOtherMember] = useState<{
        id: string,
        name: string,
        profile_picture: string
    }>(members[0]);
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<string>("Expense");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const { trigger_success } = useContext(ToasterContext);


    function checkIfValid(): string | boolean {
        let amount_value: number;
        if (members.includes(otherMember) === false) {
            return "Please enter a member of the group";
        }
        try {
            amount_value = parseInt(amount);
        } catch (e) {
            return "Please enter a valid amount";
        }
        if (amount_value <= 0) {
            return "Please enter a valid amount";
        }
        if (description === "") {
            return "Please enter a description";
        }
        if (type !== "Expense" && type !== "Income") {
            return "Please enter a valid type";
        }

        return true;
    }


    const next = <Button type="secondary" onClick={() => {
        const valid = checkIfValid();
        if (valid === true) {
            createTransaction(room?.id as string, description, parseInt(amount), type, otherMember.id).then(() => {
                setError("");
                setOpen(false);
                updateRoom(room?.id as string);
                trigger_success("Transaction created !");
            })
        } else {
            setError(valid as string);
        }
    }}>Create</Button>;
    const back = <Button type="primary" onClick={() => {
        setOpen(false);
    }}>Cancel</Button>;


    return (<Dialog open={open} setOpen={setOpen} trigger={children} title="Register a new transaction" subtitle="Let's be a rat for a moment hihi..." next={next} back={back}>
        {
            members.length === 0 ? (<p className="text-center">⚠️ You can't create a transaction because you are alone in the room</p>)
                : (
                    <>
                        <div className="py-2">
                            <Field label="Transaction name" placeholder="pizza of the mama" type="text" value={description} onChange={setDescription} />
                        </div>
                        <div className="py-2 flex flex-row items-center justify-between">
                            <span className="w-full">
                                <p className="text-tint500 mb-1">Type of transaction </p>
                                <SelectButton setValue={setType} value={type} options={["Expense", "Income"]} />

                            </span>
                        </div>
                        <div className="py-2">
                            <Field label="Amount" placeholder="How much are you a rat ?" type="number" value={amount} onChange={setAmount} />
                        </div>
                        <div className="py-2 flex flex-row items-center justify-between">
                            <span className="w-full">
                                <p className="text-tint500 mb-1">{
                                    type === "Expense" ? "Who did you pay ?" : "Who paid you ?"

                                }</p>
                                <SelectButtonSearch setValue={setOtherMember} value={otherMember} options={members} />
                            </span>
                        </div>
                        <p className="text-warn w-full text-center">{error}</p>
                    </>
                )
        }
    </Dialog>)

}
