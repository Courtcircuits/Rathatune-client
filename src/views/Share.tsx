import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Share(){
    const params = useParams();

    useEffect(() => { 
        fetch(import.meta.env.VITE_API_ENDPOINT+"/room/invite/"+params.id, {
            method: "GET",
            credentials: "include",
        }).then((data) => {
            if (data.status === 400 || data.status === 401) {
                throw new Error("Room not found");
            }else {
                location.href = import.meta.env.VITE_CLIENT_ENDPOINT+"/dashboard/1";
            }
        
        })
    }, [params])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Share</h1>
            <p className="text-2xl">Share your link to invite your friends to join your room !</p>
        </div>
    )
}