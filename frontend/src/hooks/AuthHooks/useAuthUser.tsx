import { getAuthUser } from '@/lib/authapi'
import { useQuery } from '@tanstack/react-query'

export default function useAuthUser() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['authUser'],
    queryFn: getAuthUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  return {
    authUser: data,
    isLoading,
    isError,
    refetch,
  }
}