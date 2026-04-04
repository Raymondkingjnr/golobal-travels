"use client";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Image from "next/image";
import { paris } from "@/assets";
import React from "react";
import Link from "next/link";
import { HeartIcon, MapPin, Star } from "lucide-react";
import toast from "react-hot-toast";
import { removeHotel } from "@/store/hotel-slice";

const Favourites = () => {
    const favourites = useAppSelector(state => state.favouriteHotel);
    const dispatch = useAppDispatch();

    const handleRemoveFavourite = (hotelId: string) => {
        dispatch(removeHotel({ hotelId }));
        toast.success("Hotel removed from favourites");
    };

    return (
        <div className={"min-h-screen container mx-auto px-4 mt-10"}>
            <h2 className={'font-semibold leading-5 text-base lg:text-2xl'}>Favourites</h2>
           <div>
            {favourites.hotel.length > 0 ? (
                <div className={'space-y-5 mt-5'}>
                    {favourites.hotel.map((hotel) => (
                        <div className="bg-foreground rounded-2xl overflow-hidden shadow-lg hover:shadow-md transition-shadow" key={hotel.id}>
                            <div className="flex flex-col md:flex-row">
                                <div className="relative w-full md:w-72 h-52 md:h-auto shrink-0 bg-muted">
                                    {hotel?.images ?

                                        <Image
                                            src={hotel?.images[0].url}
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


                                <div className="flex-1 p-5 flex flex-col justify-between">
                                    <div>
                                      <div className="flex flex-col  lg:flex-row items-start justify-between gap-4">
                                          <div className="flex-1">
                                              <h3 className="text-base md:text-lg font-bold text-background leading-tight">
                                                  {hotel?.name ?? "-- --"}
                                              </h3>
                                              <div className="flex items-center gap-1 mt-1.5">
                                                  <MapPin size={14} className="text-secondary" />
                                                  <span className="font-body text-xs text-mtext-background">{`${hotel?.address?.fullAddress ?? "-- --"}`}</span>
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
                                                      {hotel?.topAmenities?.length}+ Amenities
                                                 </span>
                                              </div>
                                              <div className="flex items-center gap-2 mt-3">


                                                <span className="font-body text-xs text-muted-foreground">
                                                     {hotel?.starRating ?? 0} reviews
                                                </span>
                                              </div>
                                          </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFavourite(hotel.id)}
                                            className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-muted active:scale-[0.97] transition-all"
                                        >
                                            <HeartIcon size={25} strokeWidth={3} className="text-secondary" fill={ "#fb2c36"}/>
                                        </button>

                                        <Link href={`/single-hotel/${hotel.id}`} className="flex-1 text-center py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all">
                                            View Place
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center">
                  <p className={'text-center'}>No favourite hotels found.</p>
                </div>
            )}
           </div>
        </div>
    )
}

export default Favourites;
