
import Loader from "@/app/(main)/single-hotel/loading";
import {Suspense} from "react";
import {HotelDetailsCom} from "@/app/components/hotel-details-com";

export default  async function  SingleHotel ({params}: {params: Promise<{hotelId: string}>}) {

    const {hotelId} = await params;

    return (
        <div className={"min-h-screen"}>
            <div className={"flex flex-col gap-4 container mx-auto px-4 mt-10"}>
                <Suspense fallback={<Loader />}>
                   <HotelDetailsCom hotelId={hotelId} />
                </Suspense>
            </div>
        </div>
    )
}
