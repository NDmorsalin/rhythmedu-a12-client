import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utility/axiosInstance';

const useFetchAllInstructor = () => {
    const { data: allInstructors, error, refetch, isLoading, isError } = useQuery({
        queryKey: ['AllInstructors'],
        queryFn: async () => {
            const response = await axiosInstance.get('/allinstructors')
            return response.data
        }
    })

    return { allInstructors, error, refetch, isLoading, isError}
};

export default useFetchAllInstructor;