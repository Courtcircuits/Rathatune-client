import { useQuery } from "@tanstack/react-query"

interface Invitation {
  room: string;
  sender: string;
  invite_code: string;
}

const fetchListEmails = async (pattern: string): Promise<string[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/list?q=${pattern}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  const data = await response.json()
  return data.data
}

export const useSearchEmails = (pattern: string) => {
  const { data, error } = useQuery({
    queryKey: ['emails', pattern],
    queryFn: ()=>fetchListEmails(pattern),
    staleTime: 1000 * 60 * 3,
  })
  return { data, error };
}

const fetchUserInvitations = async (): Promise<Invitation[]> => {
    const response = await fetch(import.meta.env.VITE_API_ENDPOINT + "/invite/get", {
      method: "GET",
      credentials: "include",
    })
    const data = await response.json()
    return data
}

export const useUserInvitations = (): {
  data: Invitation[] | undefined
  error: Error | null
  refetch: () => void
} => {
  const { data, error, refetch } = useQuery({
    queryKey: ["invitations"],
    queryFn: fetchUserInvitations,
  })
  return { data, error, refetch }
}
