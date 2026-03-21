
"use client";
import { Suspense } from "react";
import { flight_banner } from "@/assets";
import { useSearchParams } from "next/navigation";
import { useFlightDetails } from "@/hooks/flights-hooks/flight-details";
import { AirlineHeader, FlightSegmentCard, PriceSummary, Spinner } from "@/app/components";
import Image from "next/image";

const FlightsDetailsContent = () => {
    const searchParams = useSearchParams();

    const itemKey = searchParams.get('itemKey');
    const priceKey = searchParams.get('priceKey');

    const { data, isLoading, isError } = useFlightDetails(itemKey, priceKey);
    const flight = data?.data;

    return (
        <div className="px-4">
            <div className="max-w-350 mx-auto flex flex-col gap-6">
                {isLoading ? (
                    <div className="flex flex-col justify-center items-center">
                        <Spinner />
                    </div>
                ) : !isLoading && isError ? (
                    <p className="text-lg text-red-500 text-center mt-16">Failed to load flight details.</p>
                ) : (
                    <>
                        <div className="lg:max-w-375 mt-4 lg:mt-12 mb-5 mx-auto">
                            {flight && (
                                <div>
                                    <h2 className="text-base md:text-lg font-semibold text-background pb-2">
                                        {flight?.slices[0].segments[0].brand.name}
                                    </h2>
                                    <AirlineHeader airlines={flight.airline} />
                                </div>
                            )}
                            <Image src={flight_banner} alt="Beautiful travel destination" className="lg:h-full h-100 rounded mx-auto object-cover" />
                        </div>

                        {flight && (
                            <>
                                {flight.slices.map((slice) => (
                                    <div key={slice.id} className="flex flex-col gap-3">
                                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                                            {slice.isOvernight ? '🌙 Overnight · ' : ''}
                                            {Math.floor(Number(slice.durationInMinutes) / 60)}h {Number(slice.durationInMinutes) % 60}m total
                                        </p>
                                        {slice.segments.map((segment) => (
                                            <FlightSegmentCard key={segment.id} segment={segment} airlines={flight.airline} />
                                        ))}
                                    </div>
                                ))}
                                <PriceSummary prices={flight.price} passportRequired={flight.passportRequired} isSeatEligible={flight.isSeatEligible} />
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const FlightsDetails = () => {
    return (
        <div className="min-h-screen">
            <Suspense fallback={<Spinner />}>
                <FlightsDetailsContent />
            </Suspense>
        </div>
    );
};

export default FlightsDetails;