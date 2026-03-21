// components/hotel-details/HotelOverview.tsx
import {HotelImage, Summaries, AmenityCategory, Policies, GeoLocation} from "@/modals/hotel/interface";
import Image from "next/image";
import {paris} from "@/assets";
const tags = ["Near park", "Near nightlife", "Near theater", "Clean Hotel"];
interface Props {
    summaries?: Summaries;
    rating: number;
}



interface LocationProps {
    location?: GeoLocation;
    address?: string;
}

export const HotelOverview = ({ summaries, rating }: Props) => (
    <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-background">Overview</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{summaries?.description ?? "-- --"}</p>
        <div className="flex items-center gap-4 flex-wrap mt-2">
            <div className="flex flex-col items-center justify-center bg-primary/10 text-primary/130 rounded-xl px-4 py-3 min-w-20">
                <span className="text-2xl font-bold">{rating}</span>
                <span className="text-xs font-medium">Very good</span>
            </div>
            {tags.map((tag) => (
                <div key={tag} className="flex flex-col items-center gap-1 border border-border rounded-xl px-4 py-3 text-xs text-muted-foreground">
                    <span>✦</span>
                    <span>{tag}</span>
                </div>
            ))}
        </div>
    </div>
);

export const HotelGallery = ({ images }: { images: HotelImage[] }) => {
    const main = images[0];
    const rest = images.slice(1, 5);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 h-105">
            {main ? (
                <div className="col-span-2 row-span-2">
                    <Image src={main.url} alt={main.alt} width={600} height={400} className="w-full h-full object-cover rounded-xl" />
                </div>
            ):
                <div className="col-span-2 row-span-2">
                    <Image src={ paris} alt={'image'} width={600} height={400} className="w-full h-full object-cover rounded-xl" />
                </div>
            }
            {rest.map((img, i) => (
                <div key={i} className="relative">
                    <Image src={img.url} alt={img.alt} width={200} height={200} className="w-full h-full object-cover rounded-xl" />
                </div>
            ))}
        </div>
    );
};

export const HotelAmenities = ({ amenities }: { amenities: AmenityCategory[] }) => {
    const allAmenities = amenities.flatMap((cat) => cat.amenities).slice(0, 9);
    const hasMore = amenities.flatMap((cat) => cat.amenities).length > 9;

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-background">Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {allAmenities.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm text-muted-background">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item.name}
                    </div>
                ))}
            </div>
            {hasMore && (
                <button className="text-sm text-primary underline w-fit">+ more</button>
            )}
        </div>
    );
};
export const HotelPolicies = ({ policies }: { policies?: Policies }) => {
    if (!policies) return null;

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-background">Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                    { label: "Check In", value: policies.check_in },
                    { label: "Check Out", value: policies.check_out },
                    { label: "Internet", value: policies.internet },
                    { label: "Children", value: policies.child },
                    { label: "Pets", value: policies.pets },
                ].map(({ label, value }) => (
                    <div key={label} className="border border-border rounded-xl px-4 py-3">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="text-sm text-background mt-0.5">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const StarRating = ({ count }: { count: number }) => (
    <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < count ? "text-yellow-400" : "text-muted-foreground"}>★</span>
        ))}
    </div>
);


export const HotelMap = ({ location, address }: LocationProps) => (
    <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-background">Location / Map</h2>
            <a
                href={`https://www.google.com/maps?q=${location?.latitude},${location?.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs px-4 py-2 border border-primary text-background rounded-lg hover:bg-primary/10 transition"
            >
                View on Google Maps
            </a>
        </div>
        {location?.staticMapUrl && (
            <div className="rounded-xl overflow-hidden h-75">
                <Image
                    src={location.staticMapUrl}
                    width={400}
                    height={200}
                    alt="Hotel Map"
                    className="w-full h-100 object-cover"
                />
            </div>
        )}
        {address && <p className="text-xs text-muted-foreground">{address}</p>}
    </div>
);


