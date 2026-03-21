"use client";
import Image from "next/image";
import {
    flex_image02,
    home_banner,
    flex_image01,
    istanbul,
    baku,
    maldives,
    paris,
    new_york,
    london,
    dubai, tokyo,
} from "@/assets";
import { Plane, Building2, ArrowRightLeft, ChevronDown, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import {useState} from "react";
import Link from "next/link"


const destinations = [
    { name: 'Istanbul, Turkey', img: istanbul },
    { name: 'Baku, Azerbaijan', img: baku },
    { name: 'Sydney, Australia', img: london },
    { name: 'Malé, Maldives', img: maldives },
    { name: 'Paris, France', img: paris },
    { name: 'New York, US', img: new_york },
    { name: 'London, UK', img: london },
    { name: 'Tokyo, Japan', img: tokyo },
    { name: 'Dubai, UAE', img: dubai },
];

export default function Home() {
    const [activeTab, setActiveTab] = useState<'flights' | 'stays'>('flights');

    return (
    <div className="min-h-screen bg-white text-black">

    {/*    HERO*/}

        <section className="relative h-150 md:h-137.5 overflow-hidden">
            <Image src={home_banner} alt="Beautiful travel destination" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-background/30" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-primary-foreground">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-xl text-foreground font-body mb-2"
                >
                    Helping Others
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold text-foreground tracking-tight"
                >
                    LIVE & TRAVEL
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="font-body text-foreground text-lg mt-4"
                >
                    Special offers to suit your plan
                </motion.p>
            </div>
        </section>

        {/* Search Form */}
        <div className="max-w-5xl mx-auto -mt-20 relative z-20 px-4">
            <div className="bg-foreground rounded-2xl shadow-lg p-6">
                <div className="flex gap-6 mb-6">
                    <button
                        onClick={() => setActiveTab('flights')}
                        className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors ${
                            activeTab === 'flights' ? 'text-background border-b-2 border-primary' : 'text-muted-background'
                        }`}
                    >
                        <Plane size={16} /> Flights
                    </button>
                    <button
                        onClick={() => setActiveTab('stays')}
                        className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors ${
                            activeTab === 'stays' ? 'text-background border-b-2 border-primary' : 'text-muted-background'
                        }`}
                    >
                        <Building2 size={16} /> Stays
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative border border-border rounded-lg px-4 py-3">
                        <label className="text-xs text-muted-foreground font-body">From - To</label>
                        <div className="flex items-center justify-between">
                            <span className="font-body text-sm text-background">Lahore - Karachi</span>
                            <ArrowRightLeft size={16} className="text-muted-background" />
                        </div>
                    </div>
                    <div className="relative border border-border rounded-lg px-4 py-3">
                        <label className="text-xs text-muted-foreground font-body">Trip</label>
                        <div className="flex items-center justify-between">
                            <span className="font-body text-sm text-background">Return</span>
                            <ChevronDown size={16} className="text-muted-background" />
                        </div>
                    </div>
                    <div className="relative border border-border rounded-lg px-4 py-3">
                        <label className="text-xs text-muted-background font-body">Depart- Return</label>
                        <span className="font-body text-sm text-background block">07 Nov 22 - 13 Nov 22</span>
                    </div>
                    <div className="relative border border-border rounded-lg px-4 py-3">
                        <label className="text-xs text-muted-background font-body">Passenger - Class</label>
                        <span className="font-body text-sm text-background block">1 Passenger, Economy</span>
                    </div>
                </div>

                <div className="flex justify-end items-center gap-4 mt-4">
                    <a href="#" className="font-body text-sm text-background hover:underline">+ Add Promo Code</a>
                    <Link href={"/flights"} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-background rounded-lg  hover:opacity-90 transition-opacity">
                        <Send size={16} /> <span className={"text-xs font-semibold"}>
                        Show Flights
                           </span>
                    </Link>
                </div>
            </div>
        </div>

        {/* Destinations */}
        <section className="max-w-7xl mx-auto px-6 md:px-12  lg:px-20 py-36">
            <div className="flex flex-col md:flex-row gap-2.5 md:items-center justify-between mb-10">
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-background/50 pb-2">Plan your perfect trip</h3>
                    <p className="font-body text-muted-foreground mt-1">Search Flights & Places Hire to our most popular destinations</p>
                </div>
                <button className="px-4 py-2 border border-primary text-background rounded-lg w-fit text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                   <h2>
                       See more places
                   </h2>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 space-x-5  lg:grid-cols-3 gap-6">
                {destinations.map((dest, i) => (
                    <motion.div
                        key={dest.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="flex items-center gap-4 p-4 mt-1.5 rounded-xl shadow-lg bg-forground hover:shadow-md transition-shadow cursor-pointer group"
                    >
                        <Image src={dest.img} alt={dest.name} width={50} height={50} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                            <p className="font-semibold text-background pb-0.5">{dest.name}</p>
                            <p className="font-body text-sm text-muted-foreground">
                                Flights · Hotels · Resorts
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Flights & Hotels Cards */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { title: 'Flights', desc: 'Search Flights & Places Hire to our most popular destinations', img: flex_image01, href: '/flights' },
                    { title: 'Hotels', desc: 'Search hotels & Places Hire to our most popular destinations', img: flex_image02, href: '/hotels' },
                ].map((card) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-2xl overflow-hidden h-87.5 group cursor-pointer"
                    >
                        <Image src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-background/40" />
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-primary-foreground text-center px-6">
                            <h3 className="text-3xl font-bold mb-2 text-foreground">{card.title}</h3>
                            <p className="font-body text-sm max-w-xs text-foreground">{card.desc}</p>
                                <Link href={card.href} className=" mt-4 flex items-center gap-2 px-5 py-2.5 bg-primary text-background rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                                <Send size={14} /> Show {card.title}
                                </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

    </div>
  );
}
