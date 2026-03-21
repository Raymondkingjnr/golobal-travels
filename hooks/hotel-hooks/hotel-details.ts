import {useQuery} from "@tanstack/react-query";
import {getHotelDetails} from "@/api/hotels";

export const useHotelDetails = (hotelId: string) =>{
  return  useQuery({
        queryKey: ['hotel-details', hotelId],
        queryFn: () => getHotelDetails(hotelId),
        staleTime: 1000 * 60 * 10,
        enabled: hotelId !== null && hotelId !== undefined,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        retry: false,
    })
}