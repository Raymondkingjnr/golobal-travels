import {useQuery} from "@tanstack/react-query";
import {getHotels} from "@/api/hotels";

export const useGetHotels = (
    locationID: string | null,
    date_checkout: string | null,
    date_checkin: string | null,
    room_count?: number | null,
    adult_person_count?: number | null,
    set_your_budget?: number | null,
    star_ratings?: string | null,
    available_amenities?: string | null,
    enabled?: boolean
) => {
    return useQuery({
        queryKey: [
            'hotels',
            locationID,
            date_checkout,
            date_checkin,
            room_count,
            adult_person_count,
            set_your_budget,
            star_ratings,
            available_amenities
        ],
        queryFn: () => {
            if (!locationID || !date_checkin || !date_checkout) {
                throw new Error("Missing required params");
            }

            return getHotels(
                locationID,
                date_checkout,
                date_checkin,
                room_count,
                adult_person_count,
                set_your_budget,
                star_ratings,
                available_amenities
            );
        },
        enabled: !!enabled && !!locationID && !!date_checkin && !!date_checkout,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        retry: false,

    });
};

