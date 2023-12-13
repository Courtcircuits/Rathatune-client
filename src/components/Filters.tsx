import { useContext, useEffect, useState } from "react";
import { Link, useLocation} from "react-router-dom";
import { RoomContext } from "../contexts/RoomContext";

function Filters() {
    const [selected, setSelected] = useState(0);
    const filters = ["Transactions", "Leaderboard", "Settings"]
    const location = useLocation();
    const {room} = useContext(RoomContext);
    useEffect(() => {
        const index = filters.findIndex((filter) => filter.toLowerCase() == location.pathname.split("/")[2]);
        if (index != -1) {
            setSelected(index);
        }
    }, [location])
    return (
        <div className="border-b-1 border-tint400 px-5">
            {
                filters.map((filter, index) => {
                    return <Filter key={index} name={filter} selected={index == selected} onClick={() => {
                        setSelected(index);
                    }} disabled={room === undefined}/>
                })
            }
        </div>
    )
}

function Filter({ name, selected, onClick, disabled }: { name: string, selected: boolean, onClick: () => void, disabled?: boolean }) {
    if (disabled) return (
        <button disabled className="text-lg text-tint500 pb-2 w-fit mx-7 first:ml-0">{name}</button>
    )
    if (!selected) return (
        <Link className="mx-7 first:ml-0" to={name.toLowerCase()}>
            <button onClick={onClick} className="text-lg text-tint500 pb-2 w-fit">{name}</button>
        </Link>
    )
    return (
        <Link className="mx-7 first:ml-0" to={ name.toLowerCase()}>
            <button onClick={onClick} className="text-lg pb-2 border-tint800 border-b-2 w-fit">{name}</button>
        </Link>
    )
}

export default Filters;