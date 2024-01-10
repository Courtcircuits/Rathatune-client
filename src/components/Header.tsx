import logo from './../assets/logo.png'
import SelectIcon from '../assets/icon/select';
import Dropdown from './dropdown/Dropdown';
import DropdownRoomSelector from './dropdown/DropdownRoom';
import DropdownAccount from './dropdown/DropdownAccount';
import React, { useContext, useEffect } from 'react';
import { DialogCreateGroup } from './Dialog/Dialog';
import AddIconPlus from '../assets/icon/plus';
import { AuthContext } from '../contexts/AuthContext';
import { RoomContext } from '../contexts/RoomContext';
import { Link } from 'react-router-dom';
import { useUserInvitations } from '../queries/user.queries';

function Header() {
  const headerRef = React.useRef<HTMLHeadElement>(null);
  const { user } = useContext(AuthContext);
  const { room } = useContext(RoomContext);

  const dropdownTriggerComponent = <RoomSelector rooms={
    user.rooms
  } selected={room != undefined ? room.id : undefined} />;

  const dropdownMenu = <DropdownRoomSelector projects={
    user.rooms
  } selected={room != undefined ? room.id : undefined} />;

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        headerRef.current?.classList.add("border-b-1");
      } else {
        headerRef.current?.classList.remove("border-b-1");
      }
    })
    return () => {
      document.removeEventListener("scroll", () => {
        if (window.scrollY > 0) {
          headerRef.current?.classList.add("border-b-1");
        } else {
          headerRef.current?.classList.remove("border-b-1");
        }
      })
    }
  }, [])


  return (
    <header ref={headerRef} className='pl-5 pr-5 fixed flex flex-row w-full items-center justify-between backdrop-blur-sm bg-tintOpac0 border-b-tint300'>
      <div className='flex flex-row items-center'>
        <Link to="/dashboard" className=''>
          <Logo />
        </Link>
        <div className='mx-0 w-[0px] h-10 bg-tint400 sm:w-[1px] sm:mx-6'></div>
        <Dropdown triggerComponent={dropdownTriggerComponent} menu={dropdownMenu} />
        <div className='mx-0 w-[0px] h-7 bg-tint00 sm:mx-3 sm:w-[0px]'></div>
      </div>
      <div className='flex flex-row items-center justify-between'>
        <div className='mr-4'>
          <DialogCreateGroup>
            <div className="flex items-center w-full group hover:cursor-pointer hover:bg-tint200 py-1 rounded-sm transition-colors ease-linear duration-100 border-2 border-tint400">
              <div className="transition-colors ease-linear duration-100 stroke-tint500">
                <AddIconPlus width={30} height={25} />
              </div>
            </div>
          </DialogCreateGroup>
        </div>
        <Dropdown
          triggerComponent={<ProfilePicture url={"https://vercel.com/api/www/avatar/?u=" + user.name + "&s=60"} />}
          menu={
            <DropdownAccount />
          }
        />
      </div>


    </header>
  )
}

function Logo() {
  return (
    <img className="w-[0px] h-[70px] sm:w-[70px]" src={logo} alt="Logo" />
  )
}


interface Room {
  name: string;
  id: string;
}

function RoomSelector({ rooms, selected }: { rooms: Room[], selected: string | undefined }) {
  const selected_room = rooms.find(room => room.id === selected);
  if (!selected_room) {
    return (
      <div className='flex items-center group hover:cursor-pointer '>
        <p className='mr-5 text-lg'>{
          "No room selected"
        }</p>
        <div className='py-2 group-hover:bg-tint300 rounded-sm transition-colors ease-linear duration-100'>
          <SelectIcon width={20} height={20} />
        </div>
      </div>
    )
  }
  return (
    <div className='flex items-center group hover:cursor-pointer '>
      <p className='mr-5 text-lg'>{
        selected_room?.name
      }</p>
      <div className='py-2 group-hover:bg-tint300 rounded-sm transition-colors ease-linear duration-100'>
        <SelectIcon width={20} height={20} />
      </div>
    </div>
  )
}

function ProfilePicture({ url }: { url: string }) {
  const { data } = useUserInvitations();
  const { user } = useContext(AuthContext);

  url = user.profile_picture || url;
  if (data?.length === 0 || data === undefined) {
    return (
      <div className='flex justify-end items-end'>
        <img className="w-11 h-11 rounded-full " src={url} alt="Profile picture" />
      </div>
    )
  }
  return (
    <div className='flex justify-end items-end'>
      <img className="w-11 h-11 rounded-full " src={url} alt="Profile picture" />
      <p className="absolute content-['7'] text-tint50 translate-x-1 translate-y-1 w-fit px-2 bg-warn rounded-sm text-sm">
        {data?.length}
      </p>
    </div>
  )
}

export default Header;
