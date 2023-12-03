import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function Filters() {
    const [selected, setSelected] = useState(0);
    const filters = ["Transactions", "Leaderboard", "Settings"]
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname.split("/")[2]);
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
                    }} />
                })
            }
        </div>
    )
}

function Filter({ name, selected, onClick }: { name: string, selected: boolean, onClick: () => void }) {
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