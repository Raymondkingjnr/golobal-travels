"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
    {
        image:
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
        alt: "Tropical resort pool",
    },
    {
        image:
            "https://images.unsplash.com/photo-1540339832862-474599807836?w=800&q=80",
        alt: "Luxury beach destination",
    },
    {
        image:
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
        alt: "Private jet on runway",
    },
];

export const AuthCarousel =()=> {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-full rounded-3xl overflow-hidden">
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        i === current ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.alt}
                        width={700}
                        height={700}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full transition-all duration-300 ${
                            i === current ? "w-6 h-2 bg-[#8DD3BB]" : "w-2 h-2 bg-white/60"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}