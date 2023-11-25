import { useState } from "react";

function Filters() {
    const [selected, setSelected] = useState(0);
    const filters = ["Expenses", "Debts"]
    return (
        <div className="border-b-1 border-tint400 px-5">
            {
                filters.map((filter, index) => {
                    return <Filter key={index} name={filter} selected={index == selected} onClick={() => { }} />
                })
            }
        </div>
    )
}

function Filter({ name, selected, onClick }: { name: string, selected: boolean, onClick: () => void }) {
    if(!selected) return (
        <button className="text-lg text-tint500 pb-2 w-fit mx-7 first:mx-0" onClick={
            onClick
        }>{name}</button>
    )
    return (
        <button className="first:mx-0 text-lg pb-2 border-tint800 border-b-2 w-fit mx-7" onClick={
            onClick
        }>{name}</button>
    )
}

export default Filters;