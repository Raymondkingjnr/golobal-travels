import {useQuery} from "@tanstack/react-query";
import {searchDestination} from "@/api/flightApi";

export  function useSearchFlights(query: string, ) {
    return useQuery({
        queryKey: ['searchDestination', query],
        queryFn: () => searchDestination(query),
        enabled: query.trim().length > 2,
        staleTime: Infinity,
        gcTime: 1000 * 60 *30,
    })
}