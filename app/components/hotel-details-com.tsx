"use client";

import React from "react";
import { useHotelDetails} from "@/hooks/hotel-hooks/hotel-details";
import {
    HotelAmenities,
    HotelGallery,
    HotelMap,
    HotelOverview,
    HotelPolicies,
    StarRating
} from "@/app/components/hotel-overview";
import {Heart, MapPin, Share2} from "lucide-react";
interface Props {
    hotelId: string
}

export const HotelDetailsCom = ({hotelId}: Props) => {

    const {data} = useHotelDetails(hotelId)
    const hotel = data?.data
    return (
        <>
                    <div className={"flex flex-col gap-4"}>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-2xl font-bold text-background">{hotel?.name}</h1>
                                <StarRating count={hotel?.starRating ?? 0} />
                                <span className="text-xs text-muted-foreground">{hotel?.starRatingText}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin size={12} />
                                <span>{hotel?.address?.fullAddress ?? "-- --"}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 border border-border rounded-lg hover:bg-muted transition">
                                <Heart size={16} className="text-muted-foreground" />
                            </button>
                            <button className="p-2 border border-border rounded-lg hover:bg-muted transition">
                                <Share2 size={16} className="text-muted-foreground" />
                            </button>
                            <button className="px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition">
                                Book now
                            </button>
                        </div>
                    </div>

                    <HotelGallery images={hotel?.images ?? []} />

                    <HotelOverview summaries={hotel?.summaries} rating={hotel?.starRating ?? 0} />

                    <HotelAmenities amenities={hotel?.amenityDetails ?? []} />

                    <HotelMap location={hotel?.location} address={hotel?.address.fullAddress ?? ""} />

                    <HotelPolicies policies={hotel?.policies} />
                </div>

        </>
    )
}


