import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import {LogoIcon} from "@/assets";

export  const Footer = () => {
    return (
        <footer className="pt-16 ">
                {/* Newsletter */}
                <div className="max-w-7xl -mb-20 relative z-20 mx-auto bg-primary rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-background mb-2">
                            Subscribe<br />Newsletter
                        </h2>
                        <p className="font-body text-lg font-semibold text-background mt-4">The Travel</p>
                        <p className="font-body text-sm text-muted-foreground">
                            Get inspired! Receive travel discounts, tips and behind the scenes stories.
                        </p>
                        <div className="flex mt-4 gap-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 max-w-xs px-4 py-3 rounded-lg border border-primary bg-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-foreground"
                            />
                            <button className="px-6 py-3 bg-foreground text-background rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="bg-[#8DD3BB]  pb-16 pt-30 px-9">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 ">
                    <div className="col-span-2 md:col-span-1">
                        <LogoIcon />
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-background hover:bg-primary hover:text-primary-background transition-colors">
                                <Facebook size={14} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-background hover:bg-primary hover:text-primary-background transition-colors">
                                <Twitter size={14} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-background hover:bg-primary hover:text-primary-background transition-colors">
                                <Youtube size={14} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-background hover:bg-primary hover:text-primary-background transition-colors">
                                <Instagram size={14} />
                            </a>
                        </div>
                    </div>

                    {[
                        { title: 'Our Destinations', links: ['Canada', 'Alaska', 'France', 'Iceland'] },
                        { title: 'Our Activities', links: ['Northern Lights', 'Cruising & sailing', 'Multi-activities', 'Kayaking'] },
                        { title: 'Travel Blogs', links: ['Bali Travel Guide', 'Sri Lanka Travel Guide', 'Peru Travel Guide', 'Bali Travel Guide'] },
                        { title: 'About Us', links: ['Our Story', 'Work with us'] },
                        { title: 'Contact Us', links: ['Our Story', 'Work with us'] },
                    ].map((col) => (
                        <div key={col.title}>
                            <h4 className="font-semibold text-foreground text-sm mb-4">{col.title}</h4>
                            <ul className="space-y-2">
                                {col.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
             </div>
        </footer>
    );
};

