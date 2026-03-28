
'use client';

import React from 'react';
import {LocationItem} from "@/modals/hotel/interface";
import {Spinner} from "@/app/components/spinner";


interface Props {
    result: LocationItem[];
    onSelect: (location: LocationItem) => void;
    isLoading:boolean;
}

export const LocationDropdown = React.memo(({ result, onSelect, isLoading }: Props) => {
    if (!result?.length) return null;

    return (
        <div >
            { isLoading ?
                <Spinner />
             :
            result.map((loc) => (
                <button
                    key={loc.id}
                    onClick={() => onSelect(loc)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                >
                    <div>
                        <p className="text-sm font-medium text-background">{loc?.itemName ?? "-- --"}</p>
                        <p className="text-xs text-muted-foreground">{loc?.provinceName ?? "-- --"}</p>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground font-mono">{loc?.stateCode ?? "-- --"}</span>
                </button>
            ))
            }
        </div>
    );
});

LocationDropdown.displayName = 'LocationDropdown';