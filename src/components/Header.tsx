import { useState } from 'react';
import logo from './../assets/logo.png'
import SelectIcon from '../assets/icon/select';
import Dropdown, { DropdownMenu } from './dropdown/Dropdown';
import DropdownRoomSelector from './dropdown/DropdownRoom';
import DropdownAccount from './dropdown/DropdownAccount';

function Header() {

    const dropdownTriggerComponent = <RoomSelector rooms={[{ name: "🌴 Vacances  à Tahiti", id: "general" }, { name: "Random", id: "random" }]} selected="general" />;

    const dropdownMenu = <DropdownRoomSelector projects={[{ name: "🌴 Vacances  à Tahiti", id: "general" }, { name: "Random", id: "random" }]} selected="general" />;
    
    return (
        <header className='pl-5 pr-5 fixed flex flex-row w-full items-center justify-between'>
            <div className='flex flex-row items-center'>
                <Logo />
                <div className='mx-6 w-[1px] h-10 bg-tint400 '></div>
                <Dropdown triggerComponent={dropdownTriggerComponent} menu={dropdownMenu} />
            </div> 
            <Dropdown
                triggerComponent={<ProfilePicture url="https://vercel.com/api/www/avatar/n2WE0TQwSAig93hjViCvn4yx?&s=60" />}
                menu={
                    <DropdownAccount />
                }
            />

        </header>
    )
}

function Logo() {
    return (
        <img width={70} src={logo} alt="Logo" />
    )
}


interface Room {
    name: string;
    id: string;
}

function RoomSelector({ rooms, selected }: { rooms: Room[], selected: string }) {
    const selected_room = rooms.find(room => room.id === selected);
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
    return (
        <div className='flex justify-end items-end'>
            <img className="w-11 h-11 rounded-full " src={url} alt="Profile picture" />
            <p className="content-['7'] text-tint50 -translate-x-5 translate-y-1 w-fit px-2 bg-warn rounded-sm text-sm">
                3
            </p>
        </div>
    )
}

export default Header;