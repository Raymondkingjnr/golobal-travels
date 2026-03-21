export interface AirListingsRtlItinerary {
    __typename: "AirListingsRtlItinerary";
    itemKey: string;
    priceKey: string;
    isFused: boolean;
    isInterline: boolean;
    totalPriceWithDecimal: {
        price: number;
    };
    id: string;
    groupId: string | null;
    refId: string | null;
    isSaleEligible: boolean;
    seatsAvailable: number;
    fareBrands: FareBrand[];
    voidWindowInfo: VoidWindowInfo;
    airlines: Airline[];
    allFareBrandAttributes: FareBrandAttribute[][];
    allFareBrandNames: string[];
    candidateId: string | null;
    candidateKey: string | null;
    merchandising: string[];
    saleSavings: unknown | null;
}

export interface Airline {
    marketingAirline: string | null;
    name: string;
    image: string;
}

/* ------------------ FARE ------------------ */

export interface FareBrand {
    ancillaries: Ancillary[];
    name: string;
    isSelected: boolean;
    price: Price[];
    priceKey: string;
}

export interface Ancillary {
    name: string;
    offerType: "F" | "C" | "N"; // tighten this if you discover more
}

export interface Price {
    amount: number;
    currencyCode: string;
    type: "TOTAL_PRICE" | "AVG_PRICE" | "ADULT";
}

export interface FlightAirLine {
    baggageContentAvailable: boolean
    baggageFeeUrl: string
    code: string
    name: string
    phoneNumber: string
    smallImage: string
}