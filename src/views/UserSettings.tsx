import { useContext, useEffect, useState } from "react";
import Header from "../components/Header"
import { SettingCard } from "./RoomSettings"
import { AuthContext } from "../contexts/AuthContext";
import { useMutateUserMail, useMutateUserName, useMutateUserPicture } from "../queries/user.mutations";
import { ToasterContext } from "../contexts/ToastContext";

export default function UserSettings() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const { mutate: changeProfilePicture } = useMutateUserPicture();
  const { user } = useContext(AuthContext);
  const { mutate: name } = useMutateUserName();
  const { mutate: mutateEmail } = useMutateUserMail();
  const {trigger_alert} = useContext(ToasterContext);
  useEffect(() => {
    setUserName(user.name);
    setEmail(user.email);
  }, [user])
  return (
    <>
      <Header />
      <div className="pt-[90px] px-[10%] w-full">
        <h1 className="text-4xl font-primary font-black">Account settings</h1>
        <SettingCard action_label="update" title="Update your profile picture" description="Please dont choose a dumb photo" instruction="The picture must be a png maximum 500x500." onSubmit={() => {
        }}
          custom_button={
            <input className="border-1 flex w-full border-tint300 text-tint700 hover:bg-tint200 stroke-tint700  rounded-sm transition-colors ease-linear duration-100 " type="file" accept="image/png" onChange={(e) => {
              if (e.target.files) {
                console.log(e.target.files[0]);
                changeProfilePicture({ profile_picture: e.target.files[0] });
              }
            }} />

          }
        >
          <div className="flex flex-row items-center justify-center" onClick={()=>{
            trigger_alert("You need to click on the 'Change' button to drop a file");
          }}>
            <img src={user.profile_picture} alt="profile picture" className="w-20 h-20 rounded-full" />
          </div>
        </SettingCard>
        <SettingCard action_label="update" title="Update your name" description="Update your name. This time pick a smarter name..." instruction="The name can't be more than 50 characters long. Otherwise, you won't remember it." onSubmit={() => {
          name({ name: userName });
        }}>
          <input className="w-full bg-tint0 border-1 border-tint400 rounded-sm px-4 py-2" type="text" placeholder="Your room name" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
        </SettingCard>

        <SettingCard action_label="update" title="Update your email" description="Update your email." instruction="Your email must be valid !!!" onSubmit={() => {
          mutateEmail({ email: email });
        }}>
          <input className="w-full bg-tint0 border-1 border-tint400 rounded-sm px-4 py-2" type="text" placeholder="Your room name" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        </SettingCard>
      </div>
    </>
  )
}

