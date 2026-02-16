"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Waves, ChevronDown, Menu, X, Sparkles
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on path change
    useEffect(() => {
        if (isMenuOpen) setIsMenuOpen(false);
    }, [pathname, isMenuOpen]);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-3 shadow-lg shadow-slate-200/20 dark:shadow-none" : "bg-transparent py-6"}`}>
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
                        <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200 dark:shadow-teal-900/20 group-hover:rotate-12 transition-transform">
                            <Waves className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">CzystyDom.</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/oferta"
                            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full font-black text-sm transition-all hover:scale-105 active:scale-95 ${pathname === '/oferta' ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600'}`}
                        >
                            <Sparkles size={18} className={pathname === '/oferta' ? 'text-teal-200' : 'text-teal-600'} />
                            Pełna Oferta
                        </Link>

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
                        <ModeToggle />
                        <button
                            className="rounded-full px-7 py-3 font-bold shadow-xl shadow-teal-100 dark:shadow-none bg-teal-600 hover:bg-teal-700 text-white transition-all hover:scale-105 active:scale-95 text-sm"
                            onClick={() => {
                                if (pathname === '/') {
                                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    window.location.href = '/#booking';
                                }
                            }}
                        >
                            Zarezerwuj
                        </button>
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <ModeToggle />
                        <button
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isMenuOpen ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-black' : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800'}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Modern Full-Screen Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[90] bg-white dark:bg-slate-950 px-6 pt-32 pb-10 flex flex-col md:hidden"
                    >
                        {/* Background elements for mobile menu */}
                        <div className="absolute top-20 right-[-10%] w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-20 left-[-10%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex-grow space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Nawigacja</p>

                            <Link
                                href="/oferta"
                                className="flex items-center justify-between group py-6 border-b border-slate-100 dark:border-slate-900"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-[2rem] bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 shadow-xl shadow-teal-500/10">
                                        <Sparkles size={32} />
                                    </div>
                                    <span className="text-4xl font-black text-slate-900 dark:text-white transition-transform group-active:translate-x-2">Oferta</span>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                                    <ChevronDown className="text-slate-400 -rotate-90" />
                                </div>
                            </Link>
                        </div>

                        <div className="pt-8 space-y-4">
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] flex items-center gap-4 border border-slate-100 dark:border-slate-800">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500 relative flex-shrink-0">
                                    <Image
                                        src="https://i.pravatar.cc/150?img=32"
                                        alt="Support"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Potrzebujesz pomocy?</p>
                                    <p className="font-black text-slate-900 dark:text-white">+48 500 600 700</p>
                                </div>
                            </div>

                            <Button
                                className="w-full h-16 rounded-[2rem] font-black text-xl bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-2xl shadow-teal-500/20 active:scale-95 transition-all"
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    const bookingEl = document.getElementById('booking');
                                    if (pathname === '/') {
                                        bookingEl?.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        window.location.href = '/#booking';
                                    }
                                }}
                            >
                                Zarezerwuj Teraz
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

