import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utility/axiosInstance";
import { useAuth } from "../Provider/AuthProvider";

const useStudentEnrolledClasses = () => {
    const { user } = useAuth()
    const {
        data: myEnrolledClass,
        error,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["StudentEnrolledClasses", user?.uid],
        queryFn: async () => {
            if(user?.role ==='student'){
                const response = await axiosInstance.get(`/enrolledclasses`, {
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
        myEnrolledClass,
        error,
        isLoading,
        isError,
        refetch,
    }
};

export default useStudentEnrolledClasses;