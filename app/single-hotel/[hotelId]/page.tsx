
import {HotelDetailsCom} from "@/app/components";

export default  async function  SingleHotel ({params}: {params: Promise<{hotelId: string}>}) {

    const {hotelId} = await params;

    return (
        <div className={"min-h-screen"}>
            <div className={"flex flex-col gap-4 container mx-auto px-4 mt-10"}>
            <HotelDetailsCom hotelId={hotelId} />
            </div>
        </div>
    )
}
