import { useContext } from "react";
import Check from "../../assets/icon/check";
import CrossIcon from "../../assets/icon/cross";
import LogOutIcon from "../../assets/icon/log-out";
import SettingsIcon from "../../assets/icon/settings";
import { IconButton } from "../Button";
import { DropdownMenu, SectionSeparator } from "./Dropdown";
import { AuthContext, default_auth, logoutRequest } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useUserInvitations } from "../../queries/user.queries";

interface Invitation {
  room: string;
  sender: string;
  invite_code: string;
}

export default function DropdownAccount() {
  const { user: auth, setUser: setAuth } = useContext(AuthContext);
  const { data, refetch } = useUserInvitations();
  return (
    <DropdownMenu>
      <p className="text-tint600 mx-5 text-sm">{auth.name}</p>
      <Link to="/dashboard">
        <SectionSelector section_name="Dashboard" icon={<></>} />
      </Link>
      <SectionSelector section_name="Settings" icon={<SettingsIcon width={20} height={20} />} />
      <SectionSelector section_name="Log out" danger icon={<LogOutIcon width={20} height={20} />} onClick={() => {
        logoutRequest().then(() => {
          setAuth(default_auth);
        })
      }} />
      <div className="mx-5">
        <SectionSeparator />
        <p className="text-tint600 text-sm">Invitations</p>
        {
          data?.length === 0 ? <p className="text-tint500 text-sm">No invitations</p> :
            data?.map((invitation, index) => <Invitation key={index} from={invitation.sender} room={invitation.room} uid={invitation.invite_code} refetch={refetch} />)
        }
      </div>
    </DropdownMenu>
  )
}

function SectionSelector({ section_name, icon, danger, onClick }: { section_name: string, icon: React.ReactNode, danger?: boolean, onClick?: () => void }) {
  const dangerStyle = "text-warn stroke-warn hover:bg-lightwarn";
  let colors = "text-tint600 stroke-tint400 hover:text-tint900 hover:bg-tint200";
  if (danger) {
    colors = dangerStyle;
  }

  return (
    <button onClick={onClick} className={"flex flex-row items-center justify-between group hover:cursor-pointer my-2 py-3 px-5 duration-100 ease-linear transition-colors w-full " + colors}>
      <p className="mr-[50px]">{section_name}</p>
      {icon}
    </button>
  )
}

interface InvitationResponseData {
  id: string;
  room_id: string;
  sender_id: string;
  receiver_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  invite_code: string;
}

function Invitation({ from, room, uid, refetch }: { from: string, room: string, uid: string, refetch: () => void }) {
  return (
    <div className="flex flex-row py-5 border-b-1 border-b-tint300 last:border-b-0">
      <p className="w-3/4"><b>{from}</b> invited you to <b>{room}</b></p>
      <div className="w-1/4 flex flex-row justify-between">
        <div className="w-[50px] h-[20px]">
          <IconButton onClick={() => {
            fetch(import.meta.env.VITE_API_ENDPOINT + "/invite/join/" + uid, {
              method: "GET",
              credentials: "include",
            }).then((data) => {
              if (data.status === 400 || data.status === 401) {
                throw new Error("Room not found");
              }
              return data.json();
            })
          }} text="" type="accept" icon={<Check height={20} width={20} />} />
        </div>
        <div className="w-[50px] h-[20px]">
          <IconButton onClick={() => {
            fetch(import.meta.env.VITE_API_ENDPOINT + "/invite/deny/" + uid, {
              method: "GET",
              credentials: "include",
            }).then((data) => {
              if (data.status === 400 || data.status === 401) {
                throw new Error("Room not found");
              }
              refetch();
            })
          }} text="" type="warning" icon={<CrossIcon height={20} width={20} />} />
        </div>
      </div>
    </div>
  )
}
