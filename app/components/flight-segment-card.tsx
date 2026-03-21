// components/flights/FlightSegmentCard.tsx
import {FlightDetailsAirline, FlightSegment} from "@/modals/flight-details/interface";
import { Plane } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
    segment: FlightSegment;
    airlines: FlightDetailsAirline[];
}

export const FlightSegmentCard = React.memo(({ segment, airlines }: Props) => {
    const airline = airlines.find((a) => a.code === segment.marketingAirline);
    const durationHrs = Math.floor(Number(segment.durationInMinutes) / 60);
    const durationMins = Number(segment.durationInMinutes) % 60;

    return (
        <div className="border border-background/50 shadow rounded-xl p-4 flex flex-col gap-3">

            {/* Airline + Flight info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {airline && (
                        <div className="w-12 h-12  rounded-full">
                        <Image
                            src={`https://s1.pclncdn.com/design-assets/fly/carrier-logos/${airline.smallImage}`}
                            alt={airline.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-contain rounded-full"
                        />
                        </div>
                    )}
                    <p className="text-sm font-semibold text-background">
                        {airline?.name ?? segment.marketingAirline}
                    </p>
                    <span className="text-xs text-muted-foreground">#{segment.flightNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                        {segment.brand.name}
                    </span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                        {segment.cabinClass}
                    </span>
                </div>
            </div>

            {/* Departure → Arrival */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-lg font-bold text-background">{segment.departInfo.airport.code}</p>
                    <p className="text-xs text-muted-foreground">{segment.departInfo.airport.name}</p>
                    <p className="text-xs text-muted-foreground">{segment.departInfo.airport.city}</p>
                    <p className="text-sm font-medium text-background mt-1">
                        {new Date(segment.departInfo.time.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>

                <div className="flex flex-col items-center gap-1 flex-1">
                    <p className="text-xs text-muted-foreground">{durationHrs}h {durationMins}m</p>
                    <div className="flex items-center w-full gap-1">
                        <div className="h-px flex-1 bg-border" />
                        <Plane size={14} className="text-secondary" />
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {segment.stopQuantity === 0 ? 'Nonstop' : `${segment.stopQuantity} stop`}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-lg font-bold text-background">{segment.arrivalInfo.airport.code}</p>
                    <p className="text-xs text-muted-foreground">{segment.arrivalInfo.airport.name}</p>
                    <p className="text-xs text-muted-foreground">{segment.arrivalInfo.airport.city}</p>
                    <p className="text-sm font-medium text-background mt-1">
                        {new Date(segment.arrivalInfo.time.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>

            {/* Aircraft */}
            <p className="text-xs text-muted-foreground">Aircraft: {segment.equipmentName}</p>
        </div>
    );
});
FlightSegmentCard.displayName = 'FlightSegmentCard';