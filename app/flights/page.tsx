"use client";

import { useSearchFlights } from "@/hooks/flights-hooks/search-flights";
import { useState } from "react";
import {  Search,} from 'lucide-react';
import { searchTeams} from "@/api/flightApi";
import {DestinationDropdown,  Spinner} from "@/app/components";
import {useRouter} from "next/navigation";
import {useDebounce} from "@/app/components/debounce";
import {Suspense} from "react";
import {FlightListings} from "@/app/components/flight-listings";

type CabinClass = 'ECO' | 'PEC' | 'BUS' | 'FST';

const cabinClassLabels: Record<CabinClass, string> = {
    ECO: 'Economy',
    PEC: 'Premium Economy',
    BUS: 'Business',
    FST: 'First',
};

const Flights = () => {

    const router = useRouter()
    const formatDate = (date: Date) => {
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };
    const today = new Date();

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [selectedFrom, setSelectedFrom] = useState<searchTeams | null>(null);
    const [selectedTo, setSelectedTo] = useState<searchTeams | null>(null);
    const [departDate, setDepartDate] = useState(formatDate(today));
    const [cabinClass, setCabinClass] = useState<CabinClass>('ECO');
    const [shouldSearch, setShouldSearch] = useState(false);
    const [page, setPage] = useState(1);

    const debouncedFrom = useDebounce(from, 500);
    const debouncedTo = useDebounce(to, 500);

    const { data: fromData, isError: isFromError,  } = useSearchFlights(debouncedFrom);
    const { data: toData , isError: isToError, } = useSearchFlights(debouncedTo);

    const handleSearch = () => {
        if (!selectedFrom || !selectedTo || !departDate || !cabinClass) return;
        setShouldSearch(true);
    };

    const handleSelectFrom = (dest: searchTeams) => {
        setSelectedFrom(dest);
        setFrom(dest.cityName);
        setShouldSearch(false);
    };

    const handleSelectTo = (dest: searchTeams) => {
        setSelectedTo(dest);
        setTo(dest.cityName);
        setShouldSearch(false);
    };

    const canSearch = !!selectedFrom && !!selectedTo && !!departDate && !!cabinClass;

    const handleViewFlightNavigate = (itemKey: string, priceKey:string) =>{
        if (!itemKey || !priceKey) return; // basic guard

        const params = new URLSearchParams();
        params.append('itemKey', itemKey);
        params.append('priceKey', priceKey);

     router.push('/flights-details?' + params.toString())
    }

    return (
        <div className="min-h-screen">
            {/* Search Bar */}
            <div className="max-w-6xl shadow-lg rounded-md mx-auto px-6 py-8 my-8">
                <h2 className="pb-4 font-semibold text-sm md:text-lg"> Search for avaliable Flights</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

                    <div className="relative border border-border rounded-lg px-4 py-1">
                        <label className="text-xs text-muted-foreground font-body">From</label>
                        <input
                            type="text"
                            value={from}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setFrom(e.target.value);
                                setSelectedFrom(null); // clear selection when typing again
                            }}
                            className="w-full bg-transparent font-body text-sm text-background focus:outline-none mt-1"
                        />
                        {!selectedFrom  && (
                            <DestinationDropdown
                                results={fromData?.data.searchItems ?? []}
                                onSelect={handleSelectFrom}
                            />
                        )}
                    </div>
                    <div className="relative border border-border rounded-lg px-4 py-1">
                        <label className="text-xs text-muted-foreground font-body">To</label>
                        <input
                            type="text"
                            value={to}
                            onChange={(e) => {
                                setTo(e.target.value);
                                setSelectedTo(null);
                            }}
                            className="w-full bg-transparent font-body text-sm text-background focus:outline-none mt-1"
                        />
                        {!selectedTo && (
                            <DestinationDropdown
                                results={toData?.data.searchItems ?? []}
                                onSelect={handleSelectTo}
                            />
                        )}
                    </div>
                    <div className="border border-border rounded-lg px-4 py-1">
                        <label className="text-xs text-muted-foreground font-body">Depart Date</label>
                        <input
                            type="date"
                            value={departDate}
                            onChange={(e) => {
                                setDepartDate(e.target.value);
                                setShouldSearch(false);
                            }}
                            className="w-full bg-transparent font-body text-sm text-background focus:outline-none mt-1"
                        />
                    </div>
                    <div className="border border-border rounded-lg px-4 py-1">
                        <label className="text-xs text-muted-foreground font-body">Cabin Class</label>
                        <select
                            value={cabinClass}
                            onChange={(e) => {
                                setCabinClass(e.target.value as CabinClass)
                                setShouldSearch(false)
                            }}
                            className="w-full bg-transparent font-body text-sm text-background focus:outline-none mt-1 cursor-pointer"
                        >
                            {(Object.keys(cabinClassLabels) as CabinClass[]).map((key) => (
                                <option key={key} value={key}>{cabinClassLabels[key]}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={!canSearch}
                        className=" disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity h-full">
                        <Search size={26} strokeWidth={2} />
                    </button>
                </div>
            </div>


            {isFromError || isToError ?
                <div>
                    <h2 className={"text-center text-red-500 "}>An Error Occurred while getting flights try again later</h2>
                </div>
                :
            <div className="max-w-6xl mx-auto px-6 py-6">
                {!shouldSearch || !selectedFrom || !selectedTo ? (
                    <div className="flex flex-col gap-4">
                        <p className="text-base font-medium text-gray-500 text-center">Search for available Flights</p>
                    </div>
                ) : (
                    <Suspense fallback={<Spinner />}>
                        <FlightListings
                            originId={selectedFrom.id}
                            destinationId={selectedTo.id}
                            cabinClass={cabinClass}
                            departDate={departDate}
                            page={page}
                            setPage={setPage}
                            handleViewFlightNavigate={handleViewFlightNavigate}
                        />
                    </Suspense>
                )}
            </div>
            }
        </div>
    );
};

export default Flights;