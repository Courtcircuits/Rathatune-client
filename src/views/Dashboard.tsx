import Filters from "../components/Filters";
import { RoomContext, RoomProvider } from "../contexts/RoomContext";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useContext } from "react";


function Dashboard() {
    return (
        <RoomProvider>
            <DashboardContent />
        </RoomProvider>
    )
}


function DashboardContent(){
    const { isLoading } = useContext(RoomContext);
    return (
        <>
            <Header />
            <div className="pt-[90px]">
                <Filters />
                {
                    isLoading ? (
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-tint500 text-sm">Loading...</p>
                        </div>
                    ) : (
                        <></>
                    )
                }
                <Outlet/>
            </div>
            
        </>
    )
}



export default Dashboard;
