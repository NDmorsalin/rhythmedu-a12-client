import { useParams } from 'react-router-dom';
import { useAuth } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utility/axiosInstance';

const useSingleInstructorClasses = () => {
    const { instructorId } = useParams()
    const { user } = useAuth();

    const {
        data: singleInstructorWithClasses = {},
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["SingleInstructorClasses", instructorId],
        queryFn: async () => {
            if (user) {
                const res = await axiosInstance.get("/singleInstructor", {
                    headers: {
                        studentId: user?.uid,
                        instructorId
                    },
                });
                // console.log("with user", res);
                return res.data;
            } else {
                const res = await axiosInstance.get("/singleInstructor", {
                    headers: {
                        instructorId
                    },
                });
                // console.log("not user", res);
                return res.data;
            }
        },
    });


    return {
        singleInstructorWithClasses,
        isLoading,
        refetch,
    }
};

export default useSingleInstructorClasses;