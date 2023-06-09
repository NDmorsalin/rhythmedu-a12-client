import {
  useQuery
} from '@tanstack/react-query'
import { useAuth } from '../Provider/AuthProvider'
import axiosInstance from '../utility/axiosInstance'
const useFetchAllClasses = () => {
  const { user } = useAuth()
  const { isLoading, isError, refetch, data: classes = [], error } = useQuery({
    queryKey: ['classes', user.email],
    queryFn: async () => {
      if (user.role === 'admin') {

        const response = await axiosInstance.get('/classes')
        return response.data
      } else {
        return []
      }
    },
  })
  return { isLoading, isError, refetch, classes, error }
}

const useFetchInstructorClasses = () => {
  const { user } = useAuth()
  const { isLoading, isError, refetch, data: myClasses = [], error } = useQuery({
    queryKey: ['classes', user.email],
    queryFn: async () => {
      if (user.role === 'instructor') {
        const response = await axiosInstance.get('/myClasses')

        return response.data
      } else {
        return []
      }
    }
  })
  return { isLoading, isError, refetch, myClasses, error }
}

export { useFetchAllClasses, useFetchInstructorClasses }
