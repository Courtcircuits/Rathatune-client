import Filters from "../components/Filters";
import { RoomProvider } from "../contexts/RoomContext";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";


function Dashboard() {
    return (
        <RoomProvider>
            <Header />
            <div className="pt-[90px]">
                <Filters />
                <Outlet/>
            </div>
            
        </RoomProvider>
    )
}




export default Dashboard;