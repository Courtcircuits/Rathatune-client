import { useQuery } from "@tanstack/react-query"

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
