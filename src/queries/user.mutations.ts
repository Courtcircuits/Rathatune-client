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
