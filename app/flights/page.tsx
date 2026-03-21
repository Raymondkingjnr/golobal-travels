"use client";

import { useSearchFlights } from "@/hooks/flights-hooks/search-flights";
import { useState } from "react";
import {  Search,} from 'lucide-react';
import { searchTeams} from "@/api/flightApi";
import {DestinationDropdown, Spinner} from "@/app/components";
import {useGetFlights} from "@/hooks/flights-hooks/get-flights";
import {useDebounce} from "@/app/components/debounce";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Pagination} from "@/app/components/Pagination";

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
    const ITEMS_PER_PAGE = 10;
    const [page, setPage] = useState(1);

    // const debouncedFrom = useDebounce(from, 500);
    // const debouncedTo = useDebounce(to, 500);

    const { data: fromData, isError: isFromError  } = useSearchFlights(from );
    const { data: toData , isError: isToError} = useSearchFlights(to );



    const { data: flightsData, isLoading: loadingFlights } = useGetFlights(
        selectedFrom?.id ?? '',
        selectedTo?.id ?? '',
        cabinClass,
        departDate,
        shouldSearch && !!selectedFrom && !!selectedTo
    );

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

    const allListings = flightsData?.data?.listings ?? [];
    const totalPages = Math.ceil(allListings.length / ITEMS_PER_PAGE);
    const paginatedListings = allListings.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );


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
                        {!selectedFrom && (
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
                {loadingFlights ? (
                   <Spinner />
                ) : (
                    flightsData?.data && paginatedListings.length > 0 ?
                    <div className="flex flex-col gap-4">
                        {paginatedListings?.map((item) => {
                            const price = item?.totalPriceWithDecimal?.price;

                            return (
                                <div
                                    key={item.id}
                                    className="flex flex-col lg:flex-row lg:items-center justify-between bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition gap-4"
                                >
                                    {/* LEFT + CENTER GROUP */}
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full lg:w-3/4 gap-4">

                                        {/* Airlines */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex -space-x-3">
                                                {item?.airlines?.map((airline, index) => (
                                                    <Image
                                                        key={airline.marketingAirline || index}
                                                        src={`https://s1.pclncdn.com/design-assets/fly/carrier-logos/${airline.image}`}
                                                        alt={airline.name}
                                                        width={40}
                                                        height={40}
                                                        className="w-20 h-20 rounded-full border-2 border-foreground  object-contain"
                                                    />
                                                ))}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {item?.airlines?.map(a => a.name).join(", ")}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    {item.isInterline
                                                        ? "Operated by multiple airlines"
                                                        : "Single airline"}
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    Seats left: {item.seatsAvailable}
                                                </p>
                                            </div>
                                        </div>

                                        {/* CENTER */}
                                        <div className="flex flex-col lg:items-center text-sm text-gray-600">
                                            <p>
                                                {item?.isFused ? "Connecting Flight" : "Non-stop"}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                {item?.fareBrands?.[0]?.name || "Economy"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex flex-row-reverse lg:flex-col lg:items-end items-center gap-3 lg:gap-1">
                                        <p className="text-lg font-medium text-[#FF8682]">
                                            ${price}
                                        </p>

                                        <button onClick={()=> handleViewFlightNavigate(item.itemKey, item.priceKey)} className="px-4 py-2 bg-primary w-full lg:w-fit text-background rounded-lg text-sm hover:bg-primary/50 transition-all duration-300">
                                            View Deal
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={(newPage) => {
                                    setPage(newPage);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            />
                        )}
                    </div>
                        :
                        <div className="flex flex-col gap-4">
                            <p className="text-base font-medium text-gray-500 text-center">Search for available Flights</p>
                        </div>
                )}
            </div>
            }
        </div>
    );
};

export default Flights;