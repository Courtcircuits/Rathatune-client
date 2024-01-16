import { useContext, useState } from "react";
import Button from "../Button";
import Dialog from "./Dialog";
import { Field } from "../Field";
import SelectButton, { SelectButtonSearch } from "../SelectButton";
import { RoomContext } from "../../contexts/RoomContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useCreateTransaction } from "../../queries/transactions.mutations";

export default function DialogCreateTransaction({
    children
}: {
    children: React.ReactNode
}) {
    const { room } = useContext(RoomContext);
    const { user } = useContext(AuthContext);
    const { mutate } = useCreateTransaction();
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
          console.log(type);
            mutate({
              other_user_id: otherMember.id,
              amount: parseInt(amount),
              description: description,
              type: type === "Expense" ? "Expense" : "debt",
              room_id: room?.id as string,
              date: new Date().toISOString()
            })
            setOpen(false);
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
