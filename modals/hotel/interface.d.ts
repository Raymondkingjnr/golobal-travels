 interface LocationItem {
    itemName: string;
    id: string;
    cityID: string;
    type: "CITY" | string;
    lat: number;
    lon: number;
    proximity: number;
    savedTravelStartDate: string;
    savedTravelEndDate: string;
    cityName: string;
    stateCode: string;
    provinceName: string;
    score: number;
    radius: number;
    rank: number;
    rank2: number;
    globalScore: number;
    globalScoreReducedCityBoost: number;
    globalScoreWOHotelCountNormalize: number;
    country: string;
    countryName: string;
    countryCode: string;
    address: string;
    zip: string;
    poiID: string;
    seType: string;
    gmtOffset: number;
    entered: string;
    highlightedName: string;
    displayLine1: string;
    displayLine2: string;
}

  interface LocationResponse {
    success: boolean;
    data: { locationData: LocationItem[] }
}

interface CityInfo {
    cityId:string
    cityName:string
    countryCode:string
    countryName:string
    displayCityName:string
    lat:number
    lon:number
    stateCode:string
    stateName:string
}
  interface Hotel {
     hotelId: string;
     name: string;
     description: string;
     starRating: number;
     guestRating: number;
     reviewCount: number;
     thumbnailUrl: string;
     images: string[];
     amenities: Amenity[];
     location: Location;
     rates: Rates;
 }

  interface Amenity {
     name: string;
     icon: string;
 }

  interface Location {
     address: string;
     city: string;
     countryCode: string;
     latitude: number;
     longitude: number;
     neighborhood: string;
 }

  interface Rates {
     currency: string;
     currencySymbol: string;
     pricePerNight: number;
     pricePerNightDisplay: string;
     priceTotal: number;
     priceTotalDisplay: string;
     priceTotalWithoutTax: number;
     priceTotalWithoutTaxDisplay: string;
     taxesAndFees: number;
     taxesAndFeesDisplay: string;
     isFreeCancellationAvailable: boolean;
     isPayLaterAvailable: boolean;
 }

 interface IHotelResponse {
    success: boolean;
    data: {
        cityInfo: CityInfo;
        hotels: Hotel[];
    };
 }

 //HOTEL DETAILS

 export interface HotelDetails {
     id: string;
     name: string;
     starRating: number;
     starRatingText: string;
     address: Address;
     location: GeoLocation;
     summaries: Summaries;
     policies: Policies;
     topAmenities: string[];
     amenityDetails: AmenityCategory[];
     images: HotelImage[];
 }

 export interface Address {
     fullAddress: string;
     city: string;
     stateCode: string;
     countryCode: string;
 }

 export interface GeoLocation {
     latitude: number;
     longitude: number;
     staticMapUrl: string;
 }

 export interface Summaries {
     description: string;
     reviewSummary: string;
     neighborhoodDescription: string;
 }

 export interface Policies {
     check_in: string;
     check_out: string;
     internet: string;
     child: string;
     pets: string;
     room_rates: string;
     importantInfo: string;
 }

 export interface AmenityCategory {
     category: string;
     amenities: AmenityItem[];
 }

 export interface AmenityItem {
     name: string;
 }

 export interface HotelImage {
     alt: string;
     url: string;
 }

 interface HotelDetailsRes {
    success: boolean;
    data: HotelDetails;
 }