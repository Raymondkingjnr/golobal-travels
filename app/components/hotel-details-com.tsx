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
import {addHotel, removeHotel} from "@/store/hotel-slice"
import {useAppSelector, useAppDispatch} from "@/store/hook";
import toast from "react-hot-toast";
import {GetLoggedInUser, getSessionStorage} from "@/utils/helpers";

interface Props {
    hotelId: string
}

export const HotelDetailsCom = ({hotelId}: Props) => {

    const token = getSessionStorage();
    const loggedInUser = GetLoggedInUser();

    const {data} = useHotelDetails(hotelId)
    const hotel = data?.data

    const favouriteHotels = useAppSelector(state => state.favouriteHotel.hotel)
    const dispatch = useAppDispatch()

    const favourite = favouriteHotels.some(fav => fav.id === hotelId)

    const changefavouriteStatus = () =>{
        if (!token && !loggedInUser) return toast.error(
            "You need to login first"
        )
        if (favourite) {
            dispatch(removeHotel({hotelId}))
            toast.success("Hotel removed from favourites")
        }else {
            dispatch(addHotel({hotel: hotel}))
            toast.success("Hotel added to favourites")
        }
    }

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
                        <div className="flex items-center gap-6">
                                <Heart size={25} className="text-secondary" onClick={changefavouriteStatus} fill={favourite ? "red" : "none"}/>
                                <Share2 size={23} className="text-muted-foreground" />
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


