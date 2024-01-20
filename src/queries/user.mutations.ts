import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { ToasterContext } from "../contexts/ToastContext";
import { Room } from "../contexts/RoomContext";
import { AuthContext } from "../contexts/AuthContext";

interface UserQueried {
  id: number;
  name: string;
  profile_picture: string;
  email: string;
  rooms: Room[];
}

interface Invitation {
    id: number;
    room_id: number;
    sender_id: number;
    receiver_id: number,
    invite_code: string;
    created_at: string;
    updated_at: string;
}

const fetchUpdateProfilePicture = async ({profile_picture}: {profile_picture:File}): Promise<{
  message: string;
}> => {
  const formData = new FormData();
  formData.append('profile_picture', profile_picture);
  const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/profile_picture', { 
    method: 'POST', 
    body: formData,
    credentials: 'include',
  })
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  const data = await response.json();
  return data;
}

const fetchUpdateName = async ({name}: {name:string}): Promise<{
  data: UserQueried;
  message: string;
}> => {
  const formData = new FormData();
  formData.append('name', name);
  const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/name', { 
    method: 'PATCH', 
    body: formData,
    credentials: 'include',
  })
  const data = await response.json();
  return data;
}

const fetchUpdateMail = async ({email}: {email:string}): Promise<{
  data: UserQueried;
  message: string;
}> => {
  const formData = new FormData();
  formData.append('email', email);
  const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/email', { 
    method: 'PATCH', 
    body: formData,
    credentials: 'include',
  })
  const data = await response.json();
  return data;
}

const fetchAcceptInvitation = async ({invite_code}: {invite_code: string}): Promise<Invitation> => {
  const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/invite/join/' + invite_code, {
    method: 'GET',
    credentials: 'include',
  })
  const data = await response.json();
  return data;
}

const fetchDenyInvitation = async ({invite_code}: {invite_code: string}): Promise<Invitation> => {
  const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/invite/deny/' + invite_code, {
    method: 'GET',
    credentials: 'include',
  })
  const data = await response.json();
  return data;
}

export const useAcceptInvitation = (invite_code: string) => {
  return useMutation( {
    mutationFn: ()=>fetchAcceptInvitation({invite_code}),
  })
}


export const useDenyInvitation = (invite_code: string) => {
  return useMutation( {
    mutationFn: ()=>fetchDenyInvitation({invite_code}),
  })
}

export const useMutateUserPicture = () => {
  const { trigger_success, trigger_alert } = useContext(ToasterContext);
  const {updateUser} = useContext(AuthContext);
  return useMutation( {
    onSuccess: () => {
      trigger_success('Picture updated');
      updateUser();
    },
    onError: () => {
      trigger_alert('Error updating picture')
    },
    mutationFn: fetchUpdateProfilePicture,
  })
}

export const useMutateUserName = () => {
  const { trigger_success, trigger_alert } = useContext(ToasterContext);
  const {updateUser} = useContext(AuthContext);
  return useMutation( {
    onSuccess: () => {
      trigger_success('Name updated');
      updateUser();
    },
    onError: () => {
      trigger_alert('Error updating name')
    },
    mutationFn: fetchUpdateName,
  })
}

export const useMutateUserMail = () => {
  const { trigger_success, trigger_alert } = useContext(ToasterContext);
  const {updateUser} = useContext(AuthContext);
  return useMutation( {
    onSuccess: () => {
      trigger_success('Email updated');
      updateUser();
    },
    onError: () => {
      trigger_alert('Error updating email')
    },
    mutationFn: fetchUpdateMail,
  })
}
