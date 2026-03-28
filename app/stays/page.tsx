"use client";

import { BuildingIcon} from "lucide-react";
import {
    baku, hotelBanner, istanbul, london, maldives, MelbourneImage, ColumbiaImage, parisImage, londonImage,
} from "@/assets";
import Image from "next/image";
import {motion} from "framer-motion";
import {useLocation} from "@/hooks/hotel-hooks/get-location";
import {useState} from "react";
import {LocationDropdown} from "@/app/components";
import {useRouter} from "next/navigation";
import {LocationItem} from "@/modals/hotel/interface";
import {useDebounce} from "@/app/components/debounce";

const Stays = () => {
    const [ query, setQuery] = useState<string>('')
    const [selectLocation, setSelectLocation] = useState<LocationItem | null>(null)

    const router = useRouter()

    const debouncedQuery = useDebounce(query, 500);

    const {data:locationData, isLoading} = useLocation(debouncedQuery)

    const handleSelect  = (loco: LocationItem) =>{
     setSelectLocation(loco)
        setQuery(loco.provinceName)
    }

    const handleViewHoteles = () =>{
        if(!selectLocation) return;

        const hotelId = selectLocation?.cityID;

        const params = new URLSearchParams();
        params.set('locationId', hotelId);

        router.push(`/hotels?${params.toString()}`);
    }


    const destinations = [
        { name: 'Istanbul, Turkey', img: istanbul, places: 120 },
        { name: 'Baku, Azerbaijan', img: baku , places: 100},
        { name: 'Sydney, Australia', img: london , places: 320},
        { name: 'Malé, Maldives', img: maldives , places: 230},
        { name: 'London, UK', img: london ,places: 200},
    ];

    const places =[
        {name: 'Melbourne', dec: 'An amazing journey', price: '700', image: MelbourneImage},
        {name: 'London', dec: 'London eye adventure', price: '1000', image: londonImage},
        {name: 'Paris', dec: 'A Paris Adventure', price: '900', image: parisImage},
        {name: 'Columbia', dec: 'Amazing streets', price: '400', image: ColumbiaImage},
    ]

    const photos = [
        {
            src: "https://images.unsplash.com/photo-1455157823797-3019317cbcf0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBsYW50YXRpb258ZW58MHx8MHx8fDA%3D",
            alt: "Sri Lanka tea plantations",
        },
        {
            src: "https://images.unsplash.com/photo-1502085671122-2d218cd434e6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNsaWZmc3xlbnwwfHwwfHx8MA%3D%3D",
            alt: "Sri Lanka coastal cliffs",
        },
        {
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
            alt: "Sri Lanka jungle forest",
        },
        {
            src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
            alt: "Sri Lanka palm trees resort",
        },
    ];


    return (
        <div className={`min-h-screen`}>

            <section className="relative h-150 md:h-137.5 overflow-hidden">
            <Image src={hotelBanner} alt="Beautiful travel destination" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-background/30" />

                <div className="relative z-10 flex flex-col text-center lg:text-left justify-center lg:w-120 h-full px-5 text-primary-foreground">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-foreground lg:leading-15 tracking-tight"
                    >
                        Make your travel wishlist, we’ll do the rest
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="font-body text-foreground text-lg mt-4"
                    >
                        Special offers to suit your plan
                    </motion.p>
                </div>
            </section>

            <div className="max-w-5xl mx-auto -mt-14 relative z-20 px-4">
                <div  className="bg-foreground rounded-2xl shadow-lg p-6">
                    <div className={'flex flex-col lg:flex-row items-center gap-2'}>
                        <input
                            placeholder={'Enter your destination'}
                            type='text'
                            value={query}
                            className={'text-base border border-background rounded-lg h-11 w-full px-2 focus:outline-none'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setQuery(e.target.value)
                               setSelectLocation(null)
                            }}
                        />
                        {!selectLocation && (
                            <div className="absolute left-2 top-20 z-60 bg-foreground border max-w-90 border-border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                            <LocationDropdown result={locationData?.data.locationData ?? []} onSelect={handleSelect} isLoading={isLoading} />
                            </div>
                        )}
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-background rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity w-full lg:w-auto" onClick={handleViewHoteles}>
                            <BuildingIcon size={16} /> Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-15 container px-5 mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={"mb-8 font-semibold text-lg"}
                >
                    Popular Searches
                </motion.h2>
                <div className={' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-between items-center place-content-center place-items-center'}>
                {destinations.map((destination, index) =>(

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        key={index}
                        className="flex items-center gap-2">
                        <Image src={destination.img} width={80} height={80} alt={destination.name} className="w-20 h-20 rounded-md" />
                        <div>
                            <h3 className="text-base font-medium">{destination.name}</h3>
                            <p className="text-sm text-gray-500">{destination.places} places</p>
                        </div>
                    </motion.div>
                ))}
                </div>
            </div>

            <div className="my-30 container px-5 mx-auto">
                 <div className={'flex flex-col md:flex-row justify-between gap-2.5 items-start md:items-center'}>
                     <div className={"flex flex-col gap-3 w-full lg:max-w-130"}>
                     <motion.h2
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 0.6, delay: 0.3 }}
                         className={"font-semibold text-xl "}
                     >
                         Fall into travel
                     </motion.h2>
                     <motion.p
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 0.6, delay: 0.3 }}
                         className={"font-normal text-sm"}
                     >
                         Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.
                     </motion.p>
                     </div>
                     <button className={"border-2 border-primary rounded-md px-4 py-2 text-sm "}>
                         <span className="text-sm font-semibold">Explore</span>
                     </button>
                 </div>

                <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center place-content-center mt-12 gap-4'}>
                    {places.map((place, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="relative w-full md:w-80 h-105 rounded-2xl overflow-hidden group cursor-pointer" key={index}>
                            <Image
                                src={place.image}
                                width={70}
                                height={70}
                                alt={place.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Bottom blur overlay */}
                            <div className="absolute inset-x-0 bottom-0  h-[40%] backdrop-blur-md bg-foreground/30 rounded-b-2xl" />

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 h-[45%] flex flex-col justify-between p-5">
                                <div className="flex items-end pt-2.5 justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">{place.name}</h3>
                                        <p className="text-sm font-body text-foreground mt-0.5">{place.dec}</p>
                                    </div>
                                    <span className="text-xl font-bold text-foreground">$ {place.price}</span>
                                </div>

                                <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all">
                                    Book a Hotel
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
                <div className={"container mx-auto px-5"}>
                    <div className={'flex flex-col md:flex-row justify-between gap-2.5 items-start md:items-center'}>
                        <div className={"flex flex-col gap-3 w-full lg:max-w-130"}>
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className={"font-semibold text-xl "}
                            >
                                Fall into travel
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className={"font-normal text-sm"}
                            >
                                Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.
                            </motion.p>
                        </div>
                        <button className={"border-2 border-primary rounded-md px-4 py-2 text-sm "}>
                            <span className="text-sm font-semibold">Explore</span>
                        </button>
                    </div>

                    <section className=" bg-white flex items-center justify-between py-8 px-2">
                        <div className="flex flex-col lg:flex-row gap-5 w-full ">
                            {/* Left Card */}
                            <div className="relative flex flex-col justify-between bg-primary rounded-3xl p-8 flex-1 min-h-105">
                                {/* Price Badge */}
                                <div className="absolute top-6 right-6 bg-white rounded-xl px-4 py-2 text-center shadow-sm">
                                    <p className="text-xs text-gray-500 font-medium leading-none mb-0.5">From</p>
                                    <p className="text-2xl font-bold text-gray-900 leading-none">$700</p>
                                </div>

                                {/* Content */}
                                <div>
                                    <h1
                                        className="md:text-5xl text-3xl font-black text-gray-900 leading-tight mb-6"
                                        style={{ fontFamily: "'Georgia', serif" }}
                                    >
                                        Backpacking<br />Sri Lanka
                                    </h1>
                                    <p className="text-gray-700 text-sm leading-relaxed max-w-2xl">
                                        Traveling is a unique experience as it&lsquo;s the best way to unplug from the
                                        pushes and pulls of daily life. It helps us to forget about our problems,
                                        frustrations, and fears at home. During our journey, we experience life in
                                        different ways. We explore new places, cultures, cuisines, traditions, and
                                        ways of living.
                                    </p>
                                </div>

                                {/* Book Flight Button */}
                                <button className="mt-10 w-full bg-white text-gray-900 font-semibold py-4 rounded-2xl text-sm tracking-wide hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                                    Book Flight
                                </button>
                            </div>

                            {/* Right Side — 2x2 Photo Grid */}
                            <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-[1.4]">
                                {photos.map((photo, i) => (
                                    <div
                                        key={i}
                                        className="rounded-2xl overflow-hidden bg-gray-200"
                                        style={{ aspectRatio: "4/3" }}
                                    >
                                        <Image
                                            src={photo.src}
                                            alt={photo.alt}
                                            width={50}
                                            height={50}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

        </div>
    )
}

export default Stays