import { useQuery } from "@tanstack/react-query";
import { getSingleUser } from "@/api/auth-api";

export const useGetUser = (id: string | null) => {
    return useQuery({
        queryKey: ["current-user", id],
        queryFn: async () => {
            if (!id) {
                return null;
            }

            return getSingleUser(id);
        },
        refetchOnWindowFocus: false,
        enabled: !!id,
        retry: false,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
    });
};
