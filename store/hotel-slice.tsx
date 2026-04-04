import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { HotelDetails,} from "@/modals/hotel/interface";

interface HotelState {
    hotel:HotelDetails[]
}

const initialState: HotelState = {hotel: []}

const favouriteHotel = createSlice({
    name: 'favouriteHotel',
    initialState,
    reducers:{
        addHotel: (state, action: PayloadAction<{ hotel: HotelDetails }>) => {
            state.hotel.push(action.payload.hotel)
        },
        removeHotel: (state, action: PayloadAction<{ hotelId: string }>) => {
            state.hotel = state.hotel.filter(hotel => hotel.id !== action.payload.hotelId)
        },
    }
})

export const {addHotel, removeHotel} = favouriteHotel.actions
export default favouriteHotel.reducer;