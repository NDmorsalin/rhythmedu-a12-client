import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../Provider/AuthProvider"
import axiosInstance from "../utility/axiosInstance"

export const useFetchSelectedClasses = async () => {
    const { user } = useAuth()
    const { isLoading, isError, refetch, data: studentSelectedClasses = [], error } = useQuery({
        queryKey: ['studentSelectedClasses', user?.email],
        queryFn: async () => {
            if (user?.role === 'student') {

                const response = await axiosInstance.get('/students', {
                    headers: {
                        studentId: user?.uid
                    }
                })

                return response.data
            } else {
                return []
            }
        },
    })
    console.log('hook',studentSelectedClasses);
    return { isLoading, isError, refetch, studentSelectedClasses, error }
}
