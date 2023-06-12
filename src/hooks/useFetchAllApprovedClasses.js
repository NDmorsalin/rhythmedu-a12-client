import { useAuth } from '../Provider/AuthProvider';
import axiosInstance from '../utility/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const useFetchAllApprovedClasses = () => {
    const { user } = useAuth();

    const {
        data: allApprovedClasses,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["AllApprovedClasses", user?.uid],
        queryFn: async () => {
            if (user) {
                const res = await axiosInstance.get("/classes", {
                    headers: {
                        studentId: user?.uid,
                    },
                });
                // console.log("with user", res);
                return res.data;
            } else {
                const res = await axiosInstance.get("/classes");
                // console.log("not user", res);
                return res.data;
            }
        },
    });


    return {
        allApprovedClasses,
        isLoading,
        refetch,
    }
};

export default useFetchAllApprovedClasses;