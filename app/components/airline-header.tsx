import {FlightDetailsAirline} from "@/modals/flight-details/interface";
import Image from "next/image";
import React from "react";

export const AirlineHeader = React.memo(({ airlines }: { airlines: FlightDetailsAirline[] }) => (
    <div className="flex items-center flex-wrap gap-4 mb-4">
        {airlines.map((airline) => (
            <div key={airline.code} className="flex items-center gap-2">
                <Image
                    src={`https://s1.pclncdn.com/design-assets/fly/carrier-logos/${airline.smallImage}`}
                    alt={airline.name}
                    width={50}
                    height={50}
                    className="w-16 h-16 object-contain rounded-full"
                />
                <div>
                    <p className="text-sm font-semibold text-background">{airline.name}</p>
                    <p className="text-xs text-muted-foreground">{airline.phoneNumber}</p>
                </div>
            </div>
        ))}
    </div>
));
AirlineHeader.displayName = 'AirlineHeader';