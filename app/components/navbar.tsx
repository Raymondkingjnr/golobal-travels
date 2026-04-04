"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane, Building2, Menu, X,HeartIcon } from "lucide-react";
import { LogoIcon } from "@/assets";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";
import { useGetUser } from "@/hooks/auth-hooks/get-user";
import { getSessionStorage, watchSessionExpiry } from "@/utils/helpers";
import { GetLoggedInUser } from "@/utils/helpers";
import {useLogout} from "@/hooks/auth-hooks/login-user";

export const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [, setSessionTick] = useState(0);
    const token = getSessionStorage();
    const loggedInUser = GetLoggedInUser();
    const userId = loggedInUser?._id ?? null;
    const { data: user } = useGetUser(userId);

    const signOut = useLogout()

    useEffect(() => {
        if (!token) {
            return;
        }

        watchSessionExpiry(() => {
            setSessionTick((value) => value + 1);
        });
    }, [pathname, token]);

    const logoutHandler = () => {
        signOut.mutateAsync();
    }

    return (
        <nav className={styles.nav}>

            {/* Main Row */}
            <div className={styles.row}>

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
                    {token && user ? (
                        <div className="text-right flex items-center gap-3">
                            <Link href={"/favourite"} className={'flex items-center gap-1'}>
                                <p>Favourites</p>
                                <HeartIcon size={20}  />
                            </Link>
                            <p className="text-sm font-normal text-[#112211] capitalize">{user.name}</p>
                            <button className={styles.signupBtn} onClick={logoutHandler}>{signOut.isPending ? 'Logging out...' : 'Log Out'}</button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className={styles.loginLink}>Login</Link>
                            <Link href="/signup" className={styles.signupBtn}>Sign up</Link>
                        </>
                    )}
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
                            {token && user &&
                            <Link href={"/favourite"} className={styles.navLink}>
                                <HeartIcon size={16}  />
                                <p>Favourites</p>
                            </Link>
                            }
                            <div className={styles.mobileAuth}>
                                {token && user ? (
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-[#112211] capitalize">{user.name}</p>
                                        <button className={styles.signupBtn} onClick={logoutHandler}>{signOut.isPending ? 'Logging out...' : 'Log Out'}</button>
                                    </div>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setIsOpen(false)} className={styles.loginLink}>Login</Link>
                                        <Link href="/signup" onClick={() => setIsOpen(false)} className={styles.signupBtn}>Sign up</Link>

                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
