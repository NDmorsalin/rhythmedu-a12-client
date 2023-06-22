import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utility/axiosInstance";
import { useAuth } from "../Provider/AuthProvider";

const useStudentSelectedClasses = () => {
    const { user } = useAuth()
    const {
        data: mySelectedClass,
        error,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["mySelectedClass", user?.uid],
        queryFn: async () => {
            if(user?.role ==='student'){
                const response = await axiosInstance.get(`/students`, {
                    headers: {
                        studentid: user?.uid,
                    },
                });
                return response.data;
            }else{
                return []
            }
        },
    });
    return {
        mySelectedClass,
        error,
        isLoading,
        isError,
        refetch,
    }
};

export default useStudentSelectedClasses;