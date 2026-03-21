
export interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
    state: string;
}

export interface FlightTime {
    dateTime: string;
}

export interface ArrivalInfo {
    airport: Airport;
    time: FlightTime;
}

export interface DepartInfo {
    airport: Airport;
    time: FlightTime;
}

export interface FlightDetailsAirline {
    name: string;
    code: string;
    phoneNumber: string;
    smallImage: string;
    baggageFeeUrl: string;
}

export interface FlightSegment {
    id: number;
    flightNumber: string;
    cabinClass: string;
    durationInMinutes: string;
    stopQuantity: number;
    isOvernight: boolean;
    equipmentName: string;        // e.g "Airbus A220-300"
    marketingAirline: string;     // airline code e.g "B6"
    operatingAirline: string;
    arrivalInfo: ArrivalInfo;
    departInfo: DepartInfo;
    brand: {
        name: string;             // e.g "Blue", "Basic Economy"
    };
}

export interface FlightSlice {
    id: number;
    durationInMinutes: string;
    isOvernight: boolean;
    segments: FlightSegment[];
}

export interface PriceBreakdown {
    amount: number;
    baseFare: number;
    taxesAndFees: number;
    currencyCode: string;
    type: 'TOTAL_PRICE' | 'AVG_PRICE' | 'ADULT';
}

export interface FlightData {
    itemKey: string;
    airline: FlightDetailsAirline[];
    slices: FlightSlice[];
    price: PriceBreakdown[];
    passportRequired: boolean;
    changesAllowed: boolean | null;
    isSeatEligible: boolean;
}

export interface FlightDetailsResponse {
    status: boolean;
    message: string;
    data: FlightData;
}