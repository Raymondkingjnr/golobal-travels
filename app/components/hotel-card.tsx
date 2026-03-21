import {Heart, MapPin, Star} from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {Hotel} from "@/modals/hotel/interface";
import {paris, parisImage} from "@/assets";

interface Props {
    hotel:Hotel
}
export const HotelCard = React.memo(({hotel}: Props) => {

    return (
        <div
            className="bg-foreground rounded-2xl overflow-hidden shadow-lg hover:shadow-md transition-shadow"
        >
            <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative w-full md:w-72 h-52 md:h-auto shrink-0 bg-muted">
                    {hotel.thumbnailUrl ?

                    <Image
                        src={hotel.thumbnailUrl}
                        alt={hotel.name}
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                    />
                        :
                        <Image
                            src={paris}
                            alt={hotel.name}
                            width={60}
                            height={60}
                            className="w-full h-full object-cover"
                        />
                    }
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                        <div className="flex flex-col  lg:flex-row items-start justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-base md:text-lg font-bold text-background leading-tight">
                                    {hotel?.name ?? "-- --"}
                                </h3>
                                <div className="flex items-center gap-1 mt-1.5">
                                    <MapPin size={14} className="text-secondary" />
                                    <span className="font-body text-xs text-mtext-background">{`${hotel?.location.city ?? "-- --"}, ${hotel?.location.address ?? "-- --"}`}</span>
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center gap-0.5">
                                        {Array.from({ length: hotel?.starRating ?? 0}).map((_, si) => (
                                            <Star key={si} size={12} className="fill-secondary text-secondary" />
                                        ))}
                                    </div>
                                    <span className="font-body text-xs text-background font-medium">
                                {hotel?.starRating ?? 0} Star Hotel
                              </span>
                                    <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                                <span className="inline-block w-1 h-1 bg-muted-foreground rounded-full" />
                                        {hotel?.amenities?.length}+ Amenities
                              </span>
                                </div>
                                <div className="flex items-center gap-2 mt-3">


                                    <span className="font-body text-xs text-muted-foreground">
                                {hotel?.reviewCount ?? 0} reviews
                              </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-left lg:text-right shrink-0">
                                <p className="font-body text-xs text-muted-foreground">starting from</p>
                                <p className="text-2xl font-bold text-secondary">
                                    ${hotel?.rates?.pricePerNight}
                                    <span className="text-sm font-normal text-muted-foreground">/night</span>
                                </p>
                                <p className="font-body text-xs text-muted-foreground">excl. tax</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                        <button className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-muted active:scale-[0.97] transition-all">
                            <Heart size={25} strokeWidth={3} className="text-secondary" />
                        </button>

                           <Link href={`/single-hotel/${hotel.hotelId}`} className="flex-1 text-center py-3 rounded-md bg-primary text-primary-foreground font-sans text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all">
                            View Place
                           </Link>
                    </div>
                </div>
            </div>
        </div>
    )

})

HotelCard.displayName = 'HotelCard'