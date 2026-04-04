import { configureStore } from "@reduxjs/toolkit";
import favouriteHotelReducer from "./hotel-slice";

const FAVOURITE_HOTELS_STORAGE_KEY = "travles_favourite_hotels";

const loadFavouriteHotels = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const storedState = window.localStorage.getItem(FAVOURITE_HOTELS_STORAGE_KEY);
  if (!storedState) {
    return undefined;
  }

  try {
    return JSON.parse(storedState);
  } catch {
    window.localStorage.removeItem(FAVOURITE_HOTELS_STORAGE_KEY);
    return undefined;
  }
};

export const makeStore = () =>
  configureStore({
    reducer: {
      favouriteHotel: favouriteHotelReducer,
    },
    preloadedState: {
      favouriteHotel: loadFavouriteHotels(),
    },
  });

export const persistFavouriteHotels = (state: RootState) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    FAVOURITE_HOTELS_STORAGE_KEY,
    JSON.stringify(state.favouriteHotel),
  );
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
