"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Briefcase,
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

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 12);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const goToBooking = () => {
        setIsMenuOpen(false);

        if (pathname === "/") {
            document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }

        window.location.href = "/#booking";
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

                    <div className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-black uppercase tracking-wide transition-colors ${isActive
                                        ? "bg-teal-600 text-white"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                                        }`}
                                >
                                    <link.icon className={`h-4 w-4 ${isActive ? "text-teal-100" : "text-teal-600 dark:text-teal-400"}`} />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                        <ModeToggle />
                        <button
                            type="button"
                            onClick={goToBooking}
                            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-slate-900/15 transition-colors hover:bg-teal-600 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-300"
                        >
                            <Briefcase className="h-4 w-4" />
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
                            className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-teal-600/20 transition-colors hover:bg-teal-700"
                        >
                            <Briefcase className="h-5 w-5" />
                            Zarezerwuj termin
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};
