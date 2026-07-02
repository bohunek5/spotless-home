"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    CalendarDays,
    ChevronRight,
    CreditCard,
    Info,
    Menu,
    Phone,
    ShieldCheck,
    Sparkles,
    X,
} from "lucide-react";

import { ModeToggle } from "./ModeToggle";
import { useBookingStore } from "@/lib/store";

const navLinks = [
    { name: "Oferta", href: "/oferta", icon: Sparkles },
    { name: "Cennik", href: "/cennik", icon: CreditCard },
    { name: "O Nas", href: "/o-nas", icon: Info },
    { name: "Kontakt", href: "/kontakt", icon: Phone },
];

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const setStep = useBookingStore((state) => state.setStep);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 12);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const goToBooking = () => {
        setIsMenuOpen(false);
        setStep(3);

        if (pathname === "/") {
            window.setTimeout(() => {
                const booking = document.getElementById("booking");
                if (!booking) return;

                const targetTop = booking.getBoundingClientRect().top + window.scrollY - 110;
                window.scrollTo({ top: targetTop, behavior: "smooth" });
            }, 80);
            return;
        }

        window.localStorage.setItem("spotless-open-calendar", "1");
        const basePath = window.location.pathname.startsWith("/spotless-home") ? "/spotless-home" : "";
        window.location.href = `${basePath}/#booking`;
    };

    return (
        <header className="fixed inset-x-0 top-3 z-[100] px-3 md:px-6">
            <nav
                className={`mx-auto max-w-7xl rounded-3xl border px-3 py-3 transition-colors duration-200 md:px-5 ${scrolled || isMenuOpen
                    ? "border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95"
                    : "border-white/70 bg-white/85 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90"
                    }`}
            >
                <div className="flex items-center justify-between gap-4">
                    <Link href="/" className="flex min-w-0 items-center gap-3 active:scale-[0.98]">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-600/20">
                            <ShieldCheck className="h-6 w-6" />
                        </span>
                        <span className="truncate text-lg font-black uppercase tracking-tight text-slate-950 dark:text-white">
                            Spotless.
                        </span>
                    </Link>

                    <div className="hidden items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900 lg:flex">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wide transition-colors ${isActive
                                        ? "bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white"
                                        : "text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                                        }`}
                                >
                                    <link.icon className={`h-4 w-4 ${isActive ? "text-teal-600 dark:text-teal-300" : "text-slate-400"}`} />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                        <a
                            href="tel:+48500600700"
                            className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800 shadow-sm transition-colors hover:border-teal-200 hover:text-teal-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-teal-700"
                        >
                            <Phone className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                            500 600 700
                        </a>
                        <ModeToggle />
                        <button
                            type="button"
                            onClick={goToBooking}
                            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-amber-400 px-5 text-sm font-black uppercase tracking-wide text-slate-950 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-300 dark:bg-amber-300 dark:hover:bg-amber-200"
                        >
                            <CalendarDays className="h-4 w-4" />
                            Zarezerwuj
                        </button>
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        <ModeToggle />
                        <button
                            type="button"
                            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen((open) => !open)}
                            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800 lg:hidden">
                        <div className="grid gap-2">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center justify-between rounded-2xl px-4 py-4 transition-colors ${isActive
                                            ? "bg-teal-600 text-white"
                                            : "bg-slate-50 text-slate-800 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                                            }`}
                                    >
                                        <span className="flex items-center gap-3 font-black">
                                            <link.icon className={`h-5 w-5 ${isActive ? "text-teal-100" : "text-teal-600 dark:text-teal-400"}`} />
                                            {link.name}
                                        </span>
                                        <ChevronRight className="h-5 w-5 opacity-60" />
                                    </Link>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={goToBooking}
                            className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 text-sm font-black uppercase tracking-wide text-slate-950 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-300"
                        >
                            <CalendarDays className="h-5 w-5" />
                            Zarezerwuj termin
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};
