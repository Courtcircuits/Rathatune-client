import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams} from "react-router-dom";
import { RoomContext } from "../contexts/RoomContext";

function Filters() {
    const [selected, setSelected] = useState(0);
    const filters = ["Transactions", "Leaderboard", "Settings"]
    const location = useLocation();
    const {room} = useContext(RoomContext);
    const params = useParams();
    useEffect(() => {
        const index = filters.findIndex((filter) => filter.toLowerCase() == location.pathname.split("/")[3]);
        if (index != -1) {
            setSelected(index);
        }
    }, [params])

    useEffect(() => {
        const index = filters.findIndex((filter) => filter.toLowerCase() == location.pathname.split("/")[3]);
        document.title = `${room?.name} - ${filters[index] == undefined ? 'Transactions' : filters[index] } - Ratathune`
    }, [selected, room, params])
    return (
        <div className="border-b-1 border-tint400 sm:px-5 px-3 flex flex-row justify-between sm:block">
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
        <button disabled className="text-lg text-tint500 pb-2 w-fit sm:mx-7 mx-2 first:ml-0">{name}</button>
    )
    if (!selected) return (
        <Link className="sm:mx-7 mx-2 first:ml-0" to={name.toLowerCase()}>
            <button onClick={onClick} className="text-lg text-tint500 pb-2 w-fit">{name}</button>
        </Link>
    )
    return (
        <Link className="sm:mx-7 mx-2 first:ml-0" to={ name.toLowerCase()}>
            <button onClick={onClick} className="text-lg pb-2 border-tint800 border-b-2 w-fit">{name}</button>
        </Link>
    )
}

export default Filters;
