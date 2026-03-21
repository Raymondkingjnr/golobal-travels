import {useQuery} from "@tanstack/react-query";
import {getFlightsDetails} from "@/api/flightApi";

export  const useFlightDetails = (itemKey:string | null, priceKey:string | null) => {
    return useQuery({
        queryKey: ['flight-details', itemKey, priceKey],
        queryFn: () => getFlightsDetails(itemKey!, priceKey!),
        enabled: !!itemKey && !!priceKey,
        staleTime: Infinity,
        gcTime: 1000 * 60 *30,
    })
}