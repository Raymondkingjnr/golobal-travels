// components/DestinationDropdown.tsx
"use client";

import {searchTeams} from "@/api/flightApi";

interface Props {
    results: searchTeams[];
    onSelect: (destination: searchTeams) => void;
}

export const DestinationDropdown = ({ results, onSelect }: Props) => {
    if (!results?.length) return null;

    return (
        <div className="absolute top-full left-0 right-0 z-50 bg-foreground border border-border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
            {results.map((dest, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(dest)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                >
                    <div>
                        <p className="text-sm font-medium text-background">{dest.provinceName}</p>
                        <p className="text-xs text-muted-foreground">{dest.itemName}</p>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground font-mono">{dest.cityCode}</span>
                </button>
            ))}
        </div>
    );
};

