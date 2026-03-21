import {RAPID_API_KEY} from "@/api/flightApi";
import { HotelDetailsRes, IHotelResponse, LocationResponse} from "@/modals/hotel/interface";

const RAPID_API_HOST = 'priceline-api-pro.p.rapidapi.com';
const BASE_URL = `https://${RAPID_API_HOST}`

export const rapidApiHeaders: HeadersInit ={
    'x-rapidapi-key': RAPID_API_KEY,
    'x-rapidapi-host': RAPID_API_HOST,
    'Content-Type': 'application/json',
}

export const getLocation = async (location: string):Promise<LocationResponse> => {

    const response = await fetch(`${BASE_URL}/auto-complete-location?location=${location}`, {
        method: "GET",
        headers: rapidApiHeaders
    })

    if(!response.ok) {
        throw new Error(`Failed to fetch location data: ${response.status} ${response.statusText}`);
    }

    return response.json();
}
export const getHotels = async (
    locationID: string,
    date_checkout: string,
    date_checkin: string,
    room_count?: number | null,
    adult_person_count?: number | null,
    set_your_budget?: number | null,
    star_ratings?: string | null,
    available_amenities?: string | null
): Promise<IHotelResponse> => {

    const params = new URLSearchParams({
        locationID,
        date_checkout,
        date_checkin,
    });

    if (room_count) params.append("room_count", String(room_count));
    if (adult_person_count) params.append("adult_person_count", String(adult_person_count));
    if (set_your_budget) params.append("set_your_budget", String(set_your_budget));
    if (star_ratings) params.append("star_ratings", star_ratings);
    if (available_amenities) params.append("available_amenities", available_amenities);

    const response = await fetch(`${BASE_URL}/hotels-search?${params.toString()}`, {
        method: "GET",
        headers: rapidApiHeaders,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch hotels data: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const getHotelDetails = async (hotelId: string):Promise<HotelDetailsRes> =>{
  const response = await fetch(`${BASE_URL}/hotel-details?hotelId=${hotelId}`,
      {
          method: "GET",
          headers: rapidApiHeaders
      });

    if (!response.ok) {

        throw new Error(`Failed to fetch hotel details data: ${response.status} ${response.statusText}`)
    }

    return response.json();

}