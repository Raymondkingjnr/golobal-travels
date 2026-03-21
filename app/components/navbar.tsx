"use client";

import { useState } from "react";
import Link from "next/link";
import { Plane, Building2, Menu, X } from "lucide-react";
import { LogoIcon } from "@/assets";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={styles.nav}>

            {/* Main Row */}
            <div className={styles.row}>

                {/* Hamburger — mobile only */}


                {/* Left links — desktop only */}
                <div className={styles.leftLinks}>
                    <Link href="/flights" className={styles.navLink}>
                        <Plane size={16} /> Find Flight
                    </Link>
                    <Link href="/stays" className={styles.navLink}>
                        <Building2 size={16} /> Find Stays
                    </Link>
                </div>

                {/* Logo */}
                <Link href="/">
                    <LogoIcon />
                </Link>

                {/* Auth — desktop only */}
                <div className={styles.authButtons}>
                    <a href="#" className={styles.loginLink}>Login</a>
                    <button className={styles.signupBtn}>Sign up</button>
                </div>


                {/* Spacer to balance logo on mobile */}
                <div className={styles.spacer} />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={styles.hamburger}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className={styles.mobileMenu}
                    >
                        <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={styles.mobileMenuInner}
                        >
                            <Link href="/flights" onClick={() => setIsOpen(false)} className={styles.navLink}>
                                <Plane size={16} /> Find Flight
                            </Link>
                            <Link href="/stays" onClick={() => setIsOpen(false)} className={styles.navLink}>
                                <Building2 size={16} /> Find Stays
                            </Link>
                            <div className={styles.mobileAuth}>
                                <a href="#" className={styles.loginLink}>Login</a>
                                <button className={styles.signupBtn}>Sign up</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};