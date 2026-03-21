import {useQuery} from "@tanstack/react-query";
import {getFlights} from "@/api/flightApi";

export const useGetFlights = (originAirportCode:string, destinationAirportCode:string, cabinClass:string,departureDate: string, enabled: boolean) => {
    return useQuery({
        queryKey: ['flights', originAirportCode, destinationAirportCode, cabinClass, departureDate],
        queryFn: () => getFlights(originAirportCode, destinationAirportCode, cabinClass, departureDate),
        enabled,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 10,
    })
}