// components/flights/PriceSummary.tsx
import {PriceBreakdown} from "@/modals/flight-details/interface";
import React from 'react';

export const PriceSummary = React.memo(({ prices, passportRequired, isSeatEligible }: {
    prices: PriceBreakdown[];
    passportRequired: boolean;
    isSeatEligible: boolean;
}) => {
    const total = prices.find((p) => p.type === 'TOTAL_PRICE');
    const adult = prices.find((p) => p.type === 'ADULT');

    return (
        <div className="border border-border rounded-xl p-4 flex flex-col gap-3">
            <p className="text-sm font-semibold text-background">Price Summary</p>

            {adult && (
                <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Fare</span>
                        <span className="text-background">{adult?.currencyCode} {adult?.baseFare?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Taxes & Fees</span>
                        <span className="text-background">{adult?.currencyCode} {adult?.taxesAndFees?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-border pt-2 mt-1">
                        <span className="text-background">Total</span>
                        <span className="text-secondary text-lg">
                            {total?.currencyCode} {total?.amount.toFixed(2)}
                        </span>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-2 flex-wrap mt-1">
                {isSeatEligible && (
                    <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                        Seat Selection Available
                    </span>
                )}
                {passportRequired && (
                    <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full">
                        Passport Required
                    </span>
                )}
            </div>
        </div>
    );
});
PriceSummary.displayName = 'PriceSummary';