
"use client";
import {useGetHotels} from "@/hooks/hotel-hooks/get-hotels";
import {useSearchParams} from "next/navigation";
import {Suspense, useState} from "react";
import {Building2, CalendarDays, HouseIcon, Search, Star, User} from "lucide-react";
import {LocationDropdown, Spinner} from "@/app/components";
import {useLocation} from "@/hooks/hotel-hooks/get-location";
import {amenityLabels, AmenityCode} from "@/utils/constant/data";
import {Pagination} from "@/app/components/Pagination";
import {LocationItem} from "@/modals/hotel/interface";
import {useDebounce} from "@/app/components/debounce";
import {HotelCard} from "@/app/components/hotel-card";

const STAR_OPTIONS: { label: string; value: string }[] = [
    { label: '3+', value: '3,3.5,4,4.5,5' },
    { label: '4+', value: '4,4.5,5' },
    { label: '5', value: '5' },
];

const HotelsContent = () => {
    const searchParams = useSearchParams()
    const formatDate = (date: Date) => {
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    };

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const [checkInDate, setCheckInDate] = useState(formatDate(today));
    const [checkOutDate, setCheckOutDate] = useState(formatDate(tomorrow));
    const [roomCount, setRoomCount] = useState<number | null>(1);
    const [adultCount, setAdultCount] = useState<number | null>(1);
    const [budget, setBudget] = useState<number | null>(null);
    const [selectedStar, setSelectedStar] = useState<string | null>(null);
    const [selectedAmenities, setSelectedAmenities] = useState<AmenityCode[]>([]);
    const [query, setQuery] = useState<string>('');
    const [selectLocation, setSelectLocation] = useState<LocationItem | null>(null);
    const location = searchParams.get("locationId");
    const [page, setPage] = useState(1);
    const [shouldSearch, setShouldSearch] = useState(!!location);

    const ITEMS_PER_PAGE = 10;
   const debouncedQuery = useDebounce(query, 500);

    const toInputFormat = (date: string) => {
        const [month, day, year] = date.split('-');
        return `${year}-${month}-${day}`;
    };

    const toApiFormat = (date: string) => {
        const [year, month, day] = date.split('-');
        return `${month}-${day}-${year}`;
    };

    const locationID = selectLocation?.cityID || location;
    const canSearch = !!locationID && !!checkInDate && !!checkOutDate;

    const handleSearch = () => {
        if (!canSearch) return;
        setShouldSearch(true);
    };

    const handleSelect = (loco: LocationItem) => {
        setSelectLocation(loco);
        setQuery(loco.provinceName);
        setShouldSearch(false);
    };

    const toggleAmenity = (code: AmenityCode) => {
        setSelectedAmenities((prev) =>
            prev.includes(code) ? prev.filter((a) => a !== code) : [...prev, code]
        );
        setShouldSearch(false);
    };

    const amenitiesParam = selectedAmenities.length > 0 ? selectedAmenities.join(',') : null;

    const {data: locationData, isLoading:isLocationLoading} = useLocation(debouncedQuery);

    const {data, isLoading} = useGetHotels(
        locationID,
        checkOutDate,
        checkInDate,
        roomCount,
        adultCount,
        budget,
        selectedStar,
        amenitiesParam,
        shouldSearch && canSearch
    );

    const allHotels = data?.data.hotels ?? [];
    const totalPages = Math.ceil(allHotels.length / ITEMS_PER_PAGE);
    const paginatedList = allHotels.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    )

    return (
        <div className={`min-h-screen`}>

            {/* Search Bar */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
                    <div className="relative border border-border rounded-lg px-4 py-3">
                        <label className="text-xs text-muted-foreground font-body flex items-center gap-1">
                            <Building2 size={12}/> Enter Destination
                        </label>
                        <input
                            type="text"
                            value={query}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setQuery(e.target.value);
                                setSelectLocation(null);
                            }}
                            className="w-full bg-transparent font-body text-sm text-background/90 focus:outline-none mt-1"
                        />
                        {!selectLocation && (
                            <div className="absolute left-0 top-full z-60 w-full bg-foreground border border-border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                                <LocationDropdown result={locationData?.data.locationData ?? []} onSelect={handleSelect} isLoading={isLocationLoading}/>
                            </div>
                        )}
                    </div>
                    <div className="border border-border rounded-lg px-4 py-3">
                        <label className="text-xs text-muted-foreground font-body flex items-center gap-1">
                            <CalendarDays size={12}/> Check In
                        </label>
                        <input type="date" className="w-full bg-transparent font-body text-sm text-background/90 focus:outline-none mt-1"
                               value={toInputFormat(checkInDate)}
                               onChange={(e) => { setCheckInDate(toApiFormat(e.target.value)); setShouldSearch(false); }}
                        />
                    </div>
                    <div className="border border-border rounded-lg px-4 py-3">
                        <label className="text-xs text-muted-foreground font-body flex items-center gap-1">
                            <CalendarDays size={12}/> Check Out
                        </label>
                        <input type="date" className="w-full bg-transparent font-body text-sm text-background/90 focus:outline-none mt-1"
                               value={toInputFormat(checkOutDate)}
                               onChange={(e) => { setCheckOutDate(toApiFormat(e.target.value)); setShouldSearch(false); }}
                        />
                    </div>
                    <div className="border border-border rounded-lg px-4 py-3">
                        <label className="text-xs text-muted-foreground font-body flex items-center gap-1">
                            <HouseIcon size={12}/> Rooms
                        </label>
                        <input type="number" className="w-full bg-transparent font-body text-sm text-background/90 focus:outline-none mt-1"
                               value={roomCount ?? 1}
                               onChange={(e) => { setRoomCount(Number(e.target.value)); setShouldSearch(false); }}
                        />
                    </div>
                    <div className="border border-border rounded-lg px-4 py-3">
                        <label className="text-xs text-muted-foreground font-body flex items-center gap-1">
                            <User size={12}/> Guests
                        </label>
                        <input type="number" className="w-full bg-transparent font-body text-sm text-background/90 focus:outline-none mt-1"
                               value={adultCount ?? 1}
                               onChange={(e) => { setAdultCount(Number(e.target.value)); setShouldSearch(false); }}
                        />
                    </div>
                    <button onClick={handleSearch} disabled={!canSearch}
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all h-full disabled:opacity-50 disabled:cursor-not-allowed">
                        <Search size={25} strokeWidth={3}/>
                    </button>
                </div>
            </div>

            {/* Hotels */}
            <div className={"flex flex-col md:flex-row gap-4 mx-auto mt-10 px-4 container"}>

                {/* Filters */}
                <div className={"w-full md:w-72 md:shrink-0"}>
                    <h3 className="text-lg font-bold text-background mb-6">Filters</h3>
                    <aside className="sticky top-6 p-4 bg-foreground/20 w-full  rounded-xl flex flex-col gap-6">

                        {/* Budget */}
                        <div>
                            <span className="font-semibold text-sm text-background block mb-2">Max Price</span>
                            <input
                                type="number"
                                value={budget ?? ''}
                                placeholder="e.g. 300"
                                onChange={(e) => { setBudget(Number(e.target.value) || null); setShouldSearch(false); }}
                                className="w-full py-2 px-3 rounded-md bg-transparent border border-border text-sm text-background/90 focus:outline-none"
                            />
                        </div>

                        {/* Star Rating */}
                        <div>
                            <span className="font-semibold text-sm text-background  mb-2 flex items-center gap-1">
                                <Star size={13}/> Star Rating
                            </span>
                            <div className="flex gap-2 flex-wrap">
                                {STAR_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => {
                                            setSelectedStar(selectedStar === opt.value ? null : opt.value);
                                            setShouldSearch(false);
                                        }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                                            selectedStar === opt.value
                                                ? 'bg-primary text-primary-foreground border-primary'
                                                : 'bg-transparent text-background border-border hover:border-primary'
                                        }`}
                                    >
                                        {opt.label} ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <span className="font-semibold text-sm text-background block mb-2">Amenities</span>
                            <div className="flex flex-col gap-2">
                                {(Object.keys(amenityLabels) as AmenityCode[]).map((code) => (
                                    <label key={code} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedAmenities.includes(code)}
                                            onChange={() => toggleAmenity(code)}
                                            className="accent-primary w-4 h-4 rounded"
                                        />
                                        <span className="text-xs text-background/80 group-hover:text-background transition-colors">
                                            {amenityLabels[code]}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button className={'bg-primary py-2 px-4 text-center w-full rounded-md font-semibold my-2.5'} onClick={handleSearch} disabled={!canSearch}>
                            Apply
                        </button>

                    </aside>
                </div>

                <div className={"w-full md:flex-1"}>
                    {isLoading ? <Spinner/> : data?.data && data.data.hotels.length > 0 ? (
                        <>
                            <div>
                                <h2 className={'font-semibold text-lg'}>Show Results For</h2>
                                <p className={"font-medium text-base py-2"}>{`${data?.data.cityInfo.displayCityName}, ${data?.data?.cityInfo?.stateName} ${data?.data?.cityInfo?.countryName}`}</p>
                            </div>
                            <div className={"space-y-4"}>
                                {paginatedList?.map((hotel) => (
                                    <HotelCard key={hotel.hotelId} hotel={hotel}/>
                                ))}
                            </div>
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
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Building2 size={48} className="text-muted-foreground mb-4"/>
                            <h3 className="text-lg font-semibold text-foreground mb-1">No hotels found</h3>
                            <p className="font-body text-sm text-muted-foreground max-w-sm">
                                Try adjusting your filters or search criteria to find available hotels.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Hotels = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <HotelsContent />
        </Suspense>
    );
};

export default Hotels;