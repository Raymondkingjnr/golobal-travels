import {useQuery} from "@tanstack/react-query";
import {getLocation} from "@/api/hotels";

export const useLocation = (location: string) => {
    return useQuery({
        queryKey: ['location', location],
        queryFn: () => getLocation(location),
        enabled: location?.trim().length > 2,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 *30,
    })
}