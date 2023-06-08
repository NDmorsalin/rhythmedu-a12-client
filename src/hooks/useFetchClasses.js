import {
    useQuery
  } from '@tanstack/react-query'
import { useAuth } from '../Provider/AuthProvider'
import axiosInstance from '../utility/axiosInstance'
  const useFetchClasses = () => {
    const {user} = useAuth()
    const { isLoading, isError,refetch, data:classes=[], error } = useQuery({
        queryKey: ['classes',user.email],
        queryFn: async ()=>{
            const response = await axiosInstance.get('/classes')
            return response.data
        },
      })
        return { isLoading, isError,refetch, classes, error }
  }

  const useFetchInstructorClasses = () => {
    const {user} = useAuth()
    const { isLoading, isError,refetch, data:myClasses=[], error } = useQuery({
        queryKey: ['classes',user.email],
        queryFn: async ()=>{
            const response = await axiosInstance.get('/myClasses')
            return response.data
        }
        })
        return { isLoading, isError,refetch, myClasses, error }
    }

    export  {useFetchClasses,useFetchInstructorClasses}
