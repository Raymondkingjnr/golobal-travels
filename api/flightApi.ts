import { AirListingsRtlItinerary, FlightAirLine} from "@/modals/interface";
import {FlightDetailsResponse} from "@/modals/flight-details/interface";
//
export const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY ?? '';
const RAPID_API_HOST = 'priceline-com2.p.rapidapi.com';
const BASE_URL = `https://${RAPID_API_HOST}`;

export const rapidApiHeaders: HeadersInit = {
    'x-rapidapi-key': RAPID_API_KEY,
    'x-rapidapi-host': RAPID_API_HOST,
    'Content-Type': 'application/json',
};

export interface searchTeams {
    type:string
    itemName:string
    id:string
    displayLine1:string
    displayLine2:string
    stateCode:string
    cityID:string
    cityCode:string
    cityName:string
    countryCode:string
    country:string
    provinceName:string
    entered:string
    displayName:string
}


export interface Destination {
    duration:number
    resultMessage: string
    searchItems: searchTeams[]
}



export interface SearchDestinationResponse {
    data: Destination;
    status: boolean;
    message: string
}

export interface FlightsRes {
    listings: AirListingsRtlItinerary[];
    airline: FlightAirLine[]
}

export interface GetFlightsResponse {
    message: string;
    status: boolean
    data: FlightsRes
    meta:{
        currentPage: number
        limit: number
        totalRecords:number
        totalPage: number
    }
}



export  const searchDestination = async  (query:string):Promise<SearchDestinationResponse>=>{
    const  res = await fetch(`${BASE_URL}/flights/auto-complete?query=${encodeURIComponent(query)}`,
        {
            method: 'GET',
            headers: rapidApiHeaders,
        }
        );
    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
    }

    return res.json();
}

export const getFlights = async (originAirportCode:string, destinationAirportCode:string, cabinClass:string,departureDate: string ):Promise<GetFlightsResponse> => {

    const response = await fetch(`${BASE_URL}/flights/search-one-way?originAirportCode=${originAirportCode}&destinationAirportCode=${destinationAirportCode}&cabinClass=${cabinClass}&departureDate=${departureDate}&currency_code='USD'`,

        {
            method: 'GET',
            headers: rapidApiHeaders,
        }
        )

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
return response.json();
}

export const getFlightsDetails = async (itemKey:string, priceKey:string):Promise<FlightDetailsResponse> =>{
    const response = await fetch(`${BASE_URL}/flights/details?itemKey=${itemKey}&priceKey=${priceKey}`,
        {
            method: "GET",
            headers: rapidApiHeaders
        }
          )

    if (!response.ok){
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
}