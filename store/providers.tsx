"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, persistFavouriteHotels } from "./store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(makeStore);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      persistFavouriteHotels(store.getState());
    });

    persistFavouriteHotels(store.getState());

    return unsubscribe;
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
