"use client";

import React from "react";
import Image from "next/image";
import { useGetFlightsSuspense } from "@/hooks/flights-hooks/get-flights";
import { Pagination } from "@/app/components/Pagination";

interface FlightListingsProps {
  originId: string;
  destinationId: string;
  cabinClass: string;
  departDate: string;
  page: number;
  setPage: (page: number) => void;
  handleViewFlightNavigate: (itemKey: string, priceKey: string) => void;
}

const ITEMS_PER_PAGE = 10;

export const FlightListings = ({
  originId,
  destinationId,
  cabinClass,
  departDate,
  page,
  setPage,
  handleViewFlightNavigate,
}: FlightListingsProps) => {
  const { data: flightsData } = useGetFlightsSuspense(
    originId,
    destinationId,
    cabinClass,
    departDate
  );

  const allListings = flightsData?.data?.listings ?? [];
  const totalPages = Math.ceil(allListings.length / ITEMS_PER_PAGE);
  const paginatedListings = allListings.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (!flightsData?.data || paginatedListings.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-base font-medium text-gray-500 text-center">
          No flights found for this search
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {paginatedListings?.map((item) => {
        const price = item?.totalPriceWithDecimal?.price;

        return (
          <div
            key={item.id}
            className="flex flex-col lg:flex-row lg:items-center justify-between bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition gap-4"
          >
            {/* LEFT + CENTER GROUP */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full lg:w-3/4 gap-4">
              {/* Airlines */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {item?.airlines?.map((airline, index) => (
                    <Image
                      key={airline.marketingAirline || index}
                      src={`https://s1.pclncdn.com/design-assets/fly/carrier-logos/${airline.image}`}
                      alt={airline.name}
                      width={40}
                      height={40}
                      className="w-20 h-20 rounded-full border-2 border-foreground object-contain"
                    />
                  ))}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {item?.airlines?.map((a) => a.name).join(", ")}
                  </p>

                  <p className="text-xs text-gray-500">
                    {item.isInterline
                      ? "Operated by multiple airlines"
                      : "Single airline"}
                  </p>

                  <p className="text-xs text-gray-400">
                    Seats left: {item.seatsAvailable}
                  </p>
                </div>
              </div>

              {/* CENTER */}
              <div className="flex flex-col lg:items-center text-sm text-gray-600">
                <p>{item?.isFused ? "Connecting Flight" : "Non-stop"}</p>

                <p className="text-xs text-gray-400">
                  {item?.fareBrands?.[0]?.name || "Economy"}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-row-reverse lg:flex-col lg:items-end items-center gap-3 lg:gap-1">
              <p className="text-lg font-medium text-[#FF8682]">${price}</p>

              <button
                onClick={() => handleViewFlightNavigate(item.itemKey, item.priceKey)}
                className="px-4 py-2 bg-primary w-full lg:w-fit text-background rounded-lg text-sm hover:bg-primary/50 transition-all duration-300"
              >
                View Deal
              </button>
            </div>
          </div>
        );
      })}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
};
