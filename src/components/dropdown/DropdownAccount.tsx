import { useContext } from "react";
import Check from "../../assets/icon/check";
import CrossIcon from "../../assets/icon/cross";
import LogOutIcon from "../../assets/icon/log-out";
import SettingsIcon from "../../assets/icon/settings";
import { IconButton } from "../Button";
import { DropdownMenu, SectionSeparator } from "./Dropdown";
import { AuthContext, logoutRequest } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useUserInvitations } from "../../queries/user.queries";
import { useAcceptInvitation, useDenyInvitation } from "../../queries/user.mutations";
import { ToasterContext } from "../../contexts/ToastContext";

interface Invitation {
  room: string;
  sender: string;
  invite_code: string;
}

export default function DropdownAccount() {
  const { user: auth , updateUser} = useContext(AuthContext);
  const { data, refetch } = useUserInvitations();
  return (
    <DropdownMenu>
      <p className="text-tint600 mx-5 text-sm">{auth.name}</p>
      <Link to="/dashboard">
        <SectionSelector section_name="Dashboard" icon={<></>} />
      </Link>
      <Link to="/settings">
        <SectionSelector section_name="Settings" icon={<SettingsIcon width={20} height={20} />} />
      </Link>
      <SectionSelector section_name="Log out" danger icon={<LogOutIcon width={20} height={20} />} onClick={() => {
        logoutRequest().then(() => {
          updateUser();
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


function Invitation({ from, room, uid, refetch }: { from: string, room: string, uid: string, refetch: () => void }) {
  const { mutate: acceptInvitation, isSuccess: acceptIsSuccess, isError: acceptIsError, data  } = useAcceptInvitation(uid);
  const { mutate: denyInvitation, isSuccess: denyIsSuccess, isError: denyIsError } = useDenyInvitation(uid);
  const navigate = useNavigate();
  const { trigger_success, trigger_alert } = useContext(ToasterContext);
  const { updateUser } = useContext(AuthContext);

  if (acceptIsSuccess) {
    updateUser();
    navigate(`/dashboard/${data.room_id}`);
    trigger_success("Joined room");
  }
  if (acceptIsError) {
    trigger_alert("Failed to join room");
  }

  if (denyIsSuccess) {
    trigger_success("Denied invitation");
    refetch();
  }

  if(denyIsError) {
    trigger_alert("Failed to deny invitation");
  }

  

  return (
    <div className="flex flex-row py-5 border-b-1 border-b-tint300 last:border-b-0">
      <p className="w-3/4"><b>{from}</b> invited you to <b>{room}</b></p>
      <div className="w-1/4 flex flex-row justify-between">
        <div className="w-[50px] h-[20px]">
          <IconButton onClick={() => {
            acceptInvitation();
          }} text="" type="accept" icon={<Check height={20} width={20} />} />
        </div>
        <div className="w-[50px] h-[20px]">
          <IconButton onClick={() => {
            denyInvitation();
          }}text="" type="warning" icon={<CrossIcon height={20} width={20} />} />
        </div>
      </div>
    </div>
  )
}
