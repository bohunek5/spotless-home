"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, Home, Briefcase, Plus, Minus,
    Check, ArrowRight, ArrowLeft,
    MapPin, Mail, Phone, CreditCard,
    CalendarDays, Clock3, ShieldCheck, ClipboardCheck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useBookingStore, EXTRAS, PropertyType } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { pl } from 'date-fns/locale';

const steps = [
    "Zakres",
    "Dodatki",
    "Termin",
    "Kontakt",
    "Płatność"
];

export function BookingWizard() {
    const {
        step, nextStep, prevStep, setStep, calculateTotal
    } = useBookingStore();

    const total = calculateTotal();

    useEffect(() => {
        if (window.localStorage.getItem("spotless-open-calendar") === "1") {
            window.localStorage.removeItem("spotless-open-calendar");
            setStep(3);
        }
    }, [setStep]);

    const renderStep = () => {
        switch (step) {
            case 1:
                return <StepScope />;
            case 2:
                return <StepExtras />;
            case 3:
                return <StepSchedule />;
            case 4:
                return <StepContact />;
            case 5:
                return <StepPayment />;
            default:
                return null;
        }
    };

    return (
        <div className="mx-auto grid max-w-6xl gap-8 px-2 py-4 lg:grid-cols-[330px_1fr]">
            <aside className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white">
                <Image
                    src="/spotless-home/visuals/premium-home-cleaning.png"
                    alt="Profesjonalny serwis sprzątający"
                    fill
                    className="object-cover opacity-35"
                    sizes="330px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30" />
                <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-between">
                    <div>
                        <Badge className="mb-4 border-0 bg-amber-400 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-950">
                            Rezerwacja online
                        </Badge>
                        <h2 className="text-3xl font-black leading-tight tracking-tight">
                            Wybierz zakres, termin i godzinę serwisu.
                        </h2>
                        <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-300">
                            Moduł prowadzi przez wycenę, dodatki i kalendarz. Rezerwacja nie pobiera płatności automatycznie.
                        </p>
                    </div>

                    <div className="grid gap-3">
                        {[
                            { icon: CalendarDays, label: "Kalendarz terminów" },
                            { icon: Clock3, label: "Godziny przyjazdu" },
                            { icon: ShieldCheck, label: "Potwierdzenie kontaktu" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
                                <item.icon className="h-5 w-5 text-amber-300" />
                                <span className="text-sm font-black">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950 md:p-8">
                <div className="mb-8">
                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="text-sm font-black text-teal-600 dark:text-teal-400">Krok {step} z 5</span>
                            <h3 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">{steps[step - 1]}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {steps.map((label, index) => (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => setStep(index + 1)}
                                    className={`h-9 rounded-xl px-3 text-[10px] font-black uppercase tracking-wide transition-colors ${step === index + 1
                                        ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                                        : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Progress value={(step / 5) * 100} className="h-2 bg-slate-100 dark:bg-slate-800" />
                </div>

                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.16 }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 md:hidden">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Suma szacunkowa</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{total} zł</p>
                    </div>
                    <Button onClick={nextStep} size="lg" className="h-13 rounded-2xl bg-slate-950 px-8 text-white shadow-lg shadow-slate-900/15 hover:bg-teal-700 dark:bg-white dark:text-slate-950">
                        {step === 5 ? "Zakończ" : "Dalej"} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>

                <div className="mt-10 hidden items-center justify-between border-t border-slate-100 pt-8 dark:border-slate-800 md:flex">
                    <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={step === 1}
                        className="rounded-2xl border-slate-200 px-8 dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" /> Wstecz
                    </Button>

                    <div className="flex items-center gap-6 text-right">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-slate-500">Suma szacunkowa</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{total} zł</p>
                        </div>
                        <Button onClick={nextStep} size="lg" className="h-14 rounded-2xl bg-slate-950 px-10 text-lg font-black text-white shadow-xl shadow-slate-900/15 hover:bg-teal-700 dark:bg-white dark:text-slate-950 dark:hover:bg-amber-300">
                            {step === 5 ? "Potwierdź rezerwację" : "Kontynuuj"} <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StepScope() {
    const { scope, setPropertyType, setRooms, setBathrooms } = useBookingStore();

    const propertyTypes: { id: PropertyType; label: string; icon: LucideIcon }[] = [
        { id: 'Apartament', label: 'Apartament', icon: Building2 },
        { id: 'Dom', label: 'Dom', icon: Home },
        { id: 'Biuro', label: 'Biuro', icon: Briefcase },
    ];

    return (
        <div className="space-y-12">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Powiedz nam o swoim miejscu</h2>
                <p className="text-slate-500 dark:text-slate-400">Wybierz typ nieruchomości i rozmiar, aby zacząć.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {propertyTypes.map((type) => (
                    <Card
                        key={type.id}
                        className={cn(
                            "relative cursor-pointer p-6 transition-all border-2 flex flex-col items-center gap-4 hover:border-teal-200 dark:hover:border-teal-800",
                            scope.propertyType === type.id
                                ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 shadow-inner"
                                : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
                        )}
                        onClick={() => setPropertyType(type.id)}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                            scope.propertyType === type.id ? "bg-teal-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                        )}>
                            <type.icon className="w-6 h-6" />
                        </div>
                        <span className="font-semibold text-lg dark:text-slate-200">{type.label}</span>
                        {scope.propertyType === type.id && (
                            <div className="absolute top-2 right-2 bg-teal-500 text-white rounded-full p-1">
                                <Check className="w-4 h-4" />
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            <div className="space-y-8 max-w-xl mx-auto md:mx-0">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-lg font-semibold flex items-center gap-2 dark:text-slate-200">
                            Liczba pokoi
                            <Badge variant="secondary" className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400">{scope.rooms}</Badge>
                        </label>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => setRooms(Math.max(1, scope.rooms - 1))} className="rounded-full w-10 h-10 border-slate-200 dark:border-slate-700">
                            <Minus className="w-4 h-4" />
                        </Button>
                        <Slider
                            value={[scope.rooms]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={(val) => setRooms(val[0])}
                            className="flex-1"
                        />
                        <Button variant="outline" size="icon" onClick={() => setRooms(Math.min(10, scope.rooms + 1))} className="rounded-full w-10 h-10 border-slate-200 dark:border-slate-700">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-lg font-semibold flex items-center gap-2 dark:text-slate-200">
                            Liczba łazienek
                            <Badge variant="secondary" className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400">{scope.bathrooms}</Badge>
                        </label>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => setBathrooms(Math.max(1, scope.bathrooms - 1))} className="rounded-full w-10 h-10 border-slate-200 dark:border-slate-700">
                            <Minus className="w-4 h-4" />
                        </Button>
                        <Slider
                            value={[scope.bathrooms]}
                            min={1}
                            max={6}
                            step={1}
                            onValueChange={(val) => setBathrooms(val[0])}
                            className="flex-1"
                        />
                        <Button variant="outline" size="icon" onClick={() => setBathrooms(Math.min(6, scope.bathrooms + 1))} className="rounded-full w-10 h-10 border-slate-200 dark:border-slate-700">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StepExtras() {
    const { extras, toggleExtra } = useBookingStore();

    return (
        <div className="space-y-8">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Usługi Dodatkowe</h2>
                <p className="text-slate-500 dark:text-slate-400">Wybierz dodatki, które chcesz uwzględnić w sprzątaniu.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {EXTRAS.map((extra) => (
                    <Card
                        key={extra.id}
                        className={cn(
                            "relative cursor-pointer p-6 transition-all border-2 flex flex-col items-start gap-4 hover:shadow-lg dark:hover:shadow-teal-900/10",
                            extras.includes(extra.id)
                                ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 ring-2 ring-teal-100 dark:ring-teal-900/30"
                                : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
                        )}
                        onClick={() => toggleExtra(extra.id)}
                    >
                        <div className="text-3xl">{extra.icon}</div>
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-800 dark:text-slate-100">{extra.name}</span>
                            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">+{extra.price} zł</span>
                        </div>
                        {extras.includes(extra.id) && (
                            <div className="absolute top-4 right-4 bg-teal-500 text-white rounded-full p-1 shadow-lg">
                                <Check className="w-4 h-4" />
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}

function StepSchedule() {
    const { details, setDetails } = useBookingStore();
    const timeSlots = ["07:30", "09:00", "10:30", "12:00", "14:00", "16:00", "18:00", "20:00"];

    return (
        <div className="space-y-8">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 mb-2">Kiedy mamy przyjechać?</h2>
                <p className="text-slate-500 dark:text-slate-400">Wybierz dzień w kalendarzu i konkretną godzinę przyjazdu ekipy.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 items-start">
                <Card className="overflow-hidden rounded-[2rem] border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                    <div className="mb-4 flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kalendarz</p>
                            <p className="font-black text-slate-950 dark:text-white">Najbliższe dostępne terminy</p>
                        </div>
                        <CalendarDays className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="overflow-x-auto pb-2">
                        <Calendar
                            mode="single"
                            selected={details.date}
                            onSelect={(date) => setDetails({ date })}
                            className="min-w-[320px] w-full [--cell-size:2rem] md:[--cell-size:2.25rem]"
                            numberOfMonths={2}
                            disabled={(date) => date < new Date()}
                            locale={pl}
                        />
                    </div>
                </Card>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-black flex items-center gap-2 dark:text-slate-100">
                            <Clock3 className="w-5 h-5 text-teal-500" /> Dostępne godziny
                        </h3>
                        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                            Wybierz slot. Potwierdzimy telefonicznie przed przyjazdem.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {timeSlots.map((slot) => (
                            <Button
                                key={slot}
                                variant={details.timeSlot === slot ? "default" : "outline"}
                                className={cn(
                                    "justify-between h-14 rounded-2xl px-5 text-base font-black transition-colors",
                                    details.timeSlot === slot
                                        ? "bg-slate-950 text-white shadow-lg shadow-slate-900/10 dark:bg-white dark:text-slate-950"
                                        : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:border-teal-300 dark:hover:border-teal-700"
                                )}
                                onClick={() => setDetails({ timeSlot: slot })}
                            >
                                {slot}
                                {details.timeSlot === slot && <Check className="w-5 h-5" />}
                            </Button>
                        ))}
                    </div>

                    <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
                        <div className="flex items-start gap-3">
                            <ClipboardCheck className="mt-1 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-300" />
                            <div>
                                <p className="font-black text-slate-950 dark:text-white">Co dalej?</p>
                                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                                    Po wyborze terminu przejdziesz do danych kontaktowych. Zespół oddzwoni i potwierdzi zakres.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StepContact() {
    const { details, setDetails } = useBookingStore();

    return (
        <div className="space-y-8 max-w-2xl mx-auto md:mx-0">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Dane Kontaktowe</h2>
                <p className="text-slate-500 dark:text-slate-400">Gdzie i jak możemy się z Tobą skontaktować?</p>
            </div>

            <div className="grid gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Adres Sprzątania</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            placeholder="np. ul. Luksusowa 123, Mieszkanie 4"
                            className="pl-12 h-14 rounded-2xl border-slate-200 dark:border-slate-700 focus:ring-teal-500/20 dark:bg-slate-900 dark:text-slate-100"
                            value={details.address}
                            onChange={(e) => setDetails({ address: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Adres E-mail</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="twoj@email.pl"
                                className="pl-12 h-14 rounded-2xl border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                value={details.email}
                                onChange={(e) => setDetails({ email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Numer Telefonu</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="+48 000 000 000"
                                className="pl-12 h-14 rounded-2xl border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                value={details.phone}
                                onChange={(e) => setDetails({ phone: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StepPayment() {
    return (
        <div className="space-y-8 max-w-2xl mx-auto md:mx-0">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Bezpieczna Płatność</h2>
                <p className="text-slate-500 dark:text-slate-400">Szybkie i bezpieczne przetwarzanie płatności.</p>
            </div>

            <div className="space-y-6">
                <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 h-16 rounded-2xl border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-1 group dark:bg-slate-900">
                        <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Zapłać przez</span>
                        <span className="text-lg font-bold dark:text-slate-200">Apple Pay</span>
                    </Button>
                    <Button variant="outline" className="flex-1 h-16 rounded-2xl border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-1 group dark:bg-slate-900">
                        <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Zapłać przez</span>
                        <span className="text-lg font-bold dark:text-slate-200">Google Pay</span>
                    </Button>
                    <Button variant="outline" className="flex-1 h-16 rounded-2xl border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-1 group dark:bg-slate-900">
                        <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Zapłać przez</span>
                        <span className="text-lg font-bold dark:text-slate-200">BLIK</span>
                    </Button>
                </div>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-3 text-slate-500 font-bold">Lub użyj karty</span>
                    </div>
                </div>

                <Card className="p-8 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-6 rounded-[2rem]">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Numer Karty</label>
                        <div className="relative">
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input placeholder="0000 0000 0000 0000" className="pl-12 h-14 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500 ml-1">Data Ważności</label>
                            <Input placeholder="MM/RR" className="h-14 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500 ml-1">Kod CVC</label>
                            <Input placeholder="123" className="h-14 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" />
                        </div>
                    </div>
                </Card>

                <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/30 p-4 rounded-2xl flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-teal-800 dark:text-teal-300 leading-relaxed">
                        Twoja płatność jest zabezpieczona szyfrowaniem SSL. Opłata zostanie pobrana dopiero po wykonaniu usługi i Twoim zatwierdzeniu.
                    </p>
                </div>
            </div>
        </div>
    );
}
