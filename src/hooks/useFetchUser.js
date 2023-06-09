import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../Provider/AuthProvider';
import axiosInstance from '../utility/axiosInstance';

const useFetchUser = () => {
    const { user } = useAuth()
    
    const { data: users = [], error, isError, isLoading, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            if (user.role === 'admin') {

                const response = await  axiosInstance.get('/users');
                return response.data;
            }
            return [];
        }
    })
    return { users, error, isError, isLoading, refetch }
};

export default useFetchUser;