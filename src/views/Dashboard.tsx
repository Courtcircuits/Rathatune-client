import Filters from "../components/Filters";
import { RoomProvider } from "../contexts/RoomContext";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";


function Dashboard() {
    return (
        <RoomProvider>
            <DashboardContent />
        </RoomProvider>
    )
}


function DashboardContent(){
    return (
        <>
            <Header/>
            <div className="pt-[90px]">
                <Filters />
                <Outlet/>
            </div>
            
        </>
    )
}



export default Dashboard;
