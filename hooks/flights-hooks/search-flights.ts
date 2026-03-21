import {useQuery} from "@tanstack/react-query";
import {searchDestination} from "@/api/flightApi";

export  function useSearchFlights(query: string, ) {
    return useQuery({
        queryKey: ['searchDestination', query],
        queryFn: () => searchDestination(query),
        enabled: query.trim().length > 2,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 10,
    })
}