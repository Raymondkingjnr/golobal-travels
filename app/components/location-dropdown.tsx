
'use client';

import React from 'react';
import {LocationItem} from "@/modals/hotel/interface";


interface Props {
    result: LocationItem[];
    onSelect: (location: LocationItem) => void;
}

export const LocationDropdown = React.memo(({ result, onSelect }: Props) => {
    if (!result?.length) return null;

    return (
        <div >
            {result.map((loc) => (
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
            ))}
        </div>
    );
});

LocationDropdown.displayName = 'LocationDropdown';