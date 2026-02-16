"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Sparkles, Star,
  Calendar,
  Users,
  Droplets, Heart, Zap,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingWizard } from "@/components/BookingWizard";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const visualizations = [
    { title: "Minimalistyczny Salon", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800", desc: "Perfekcja w każdym detalu." },
    { title: "Nowoczesna Kuchnia", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800", desc: "Higiena na najwyższym poziomie." },
    { title: "Luksusowa Łazienka", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800", desc: "Twoja oaza spokoju." },
    { title: "Przestrzeń Biurowa", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", desc: "Produktywność w czystym otoczeniu." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-teal-500 origin-left z-[101]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-teal-500/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-float-delayed" />
          <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] animate-float" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Badge variant="secondary" className="mb-6 py-2 px-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-teal-700 dark:text-teal-400 font-black border-slate-200 dark:border-slate-800 shadow-xl inline-flex items-center gap-2 group cursor-default hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-teal-500 animate-pulse" /> #1 SERWIS SPRZĄTAJĄCY NA MAZURACH
              </Badge>
              <h1 className="text-6xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tight leading-[0.85] mb-10">
                Dom, który <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600">Lśni Czystością.</span>
              </h1>
              <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto mb-12">
                Zarezerwuj w 60 sekund. Ciesz się luksusowym wykończeniem bez wychodzenia z domu.
              </p>
            </motion.div>
          </div>

          <motion.div
            id="booking"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.3 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[4rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] dark:shadow-none border border-white/40 dark:border-slate-800 p-1 md:p-3 overflow-hidden group"
          >
            <div className="bg-slate-950 dark:bg-black rounded-[3.2rem] p-8 md:p-12 flex flex-col lg:flex-row justify-between items-center gap-10 relative overflow-hidden">
              {/* Background glow for the bar */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-500/10 blur-[100px] pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 w-full lg:w-auto">
                <div className="flex -space-x-5">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="w-16 h-16 rounded-full overflow-hidden border-4 border-slate-950 shadow-2xl relative transition-transform hover:-translate-y-2 cursor-pointer">
                      <Image
                        src={`https://i.pravatar.cc/150?img=${i + 20}`}
                        alt="Specialist"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-center md:text-left">
                  <p className="text-white font-black text-2xl tracking-tighter leading-none mb-1">Eksperci Spotless</p>
                  <p className="text-teal-500 text-sm font-black uppercase tracking-widest">Dostępni już teraz w Twojej okolicy</p>
                </div>
              </div>

              <div className="flex gap-10 lg:gap-16 relative z-10">
                <div className="text-center group cursor-default">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <p className="text-4xl lg:text-5xl font-black text-white group-hover:text-teal-400 transition-colors">4.99</p>
                    <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
                  </div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Średnia Ocena</p>
                </div>
                <div className="text-center group cursor-default">
                  <p className="text-4xl lg:text-5xl font-black text-white group-hover:text-teal-400 transition-colors">15k+</p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Realizacji</p>
                </div>
              </div>
            </div>

            <div className="px-4 py-8 md:px-12 md:py-12">
              <BookingWizard />
            </div>
          </motion.div>
        </div>

        {/* Floating elements with improved motion */}
        <motion.div
          animate={{
            y: [0, -50, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-[10%] text-teal-500/20 dark:text-teal-400/10 pointer-events-none"
        >
          <Droplets size={160} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 60, 0],
            rotate: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[60%] right-[15%] text-blue-500/20 dark:text-blue-400/10 pointer-events-none"
        >
          <Sparkles size={140} />
        </motion.div>
      </section>


      {/* Visualizations Section */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full px-6 py-2 border-0">Standard Premium</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Zasmakuj najwyższej <br /><span className="text-teal-600">jakości czystości.</span></h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-sm">Dbamy o każdą powierzchnię, używając specjalistycznych środków i nowoczesnego sprzętu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visualizations.map((v, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[500px] rounded-[3rem] overflow-hidden cursor-default"
              >
                <Image
                  src={v.img}
                  alt={v.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-black text-white mb-2">{v.title}</h3>
                  <p className="text-slate-300 font-medium">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-900 dark:bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          {[
            { label: "Domów Miesięcznie", val: "2,500+", icon: Heart },
            { label: "Wykwalifikowanych Osób", val: "180+", icon: Users },
            { label: "Zaoszczędzonych Godzin", val: "45,000", icon: Zap },
            { label: "Eko-Środków (kg)", val: "600", icon: Leaf }
          ].map((stat, i) => (
            <motion.div key={i} {...fadeIn} className="text-center group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-teal-500 mx-auto mb-6 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                <stat.icon size={32} />
              </div>
              <p className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{stat.val}</p>
              <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">Jak to działa?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed">System CzystyDom został zaprojektowany tak, aby zminimalizować Twój wysiłek. Zobacz 3 kroki do idealnego domu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { step: "01", title: "Szybka Rezerwacja", desc: "Wymierasz termin, zakres i dodatki. Płatność online w sekundy.", icon: Calendar, color: "teal" },
              { step: "02", title: "Dopasowanie Specjalisty", desc: "Nasz algorytm wybiera najlepszego pracownika w Twojej okolicy.", icon: Users, color: "blue" },
              { step: "03", title: "Ciesz się Efektem", desc: "Relaksujesz się, gdy my sprawiamy, że Twój dom lśni jak nowy.", icon: Sparkles, color: "purple" }
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="relative group pt-12"
              >
                <div className="text-[12rem] font-black text-slate-200 dark:text-slate-900/50 absolute top-0 left-0 leading-none select-none -z-10 group-hover:text-teal-500/10 transition-colors duration-500">{item.step}</div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none hover:shadow-2xl transition-all duration-300 relative z-10">
                  <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-8">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-white dark:bg-slate-950 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white text-center mb-24 tracking-tight leading-tight">Dołącz do <span className="text-teal-600">tysięcy rodzin</span>,<br /> które nam zaufały.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Anna Kowalska", loc: "Warszawa", text: "Nigdy nie sądziłam, że sprzątanie może być tak łatwe do zamówienia. Efekt przeszedł moje oczekiwania!" },
              { name: "Marek Nowak", loc: "Kraków", text: "Profesjonalizm w każdym calu. Specjalistka przyjechała punktualnie i była niesamowicie dokładna." },
              { name: "Julia Wiśniewska", loc: "Gdańsk", text: "Spotless to teraz mój stały partner. Dom lśni, a ja mam czas dla dzieci. Polecam każdemu!" }
            ].map((testimonial, id) => (
              <motion.div
                key={id}
                {...fadeIn}
                transition={{ delay: id * 0.1 }}
                className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} className="fill-teal-500 text-teal-500" />)}
                </div>
                <p className="text-lg text-slate-700 dark:text-slate-300 font-bold italic leading-relaxed mb-10">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="w-14 h-14 rounded-full border-2 border-teal-500 shadow-lg relative overflow-hidden flex-shrink-0">
                    <Image
                      src={`https://i.pravatar.cc/150?img=${id + 50}`}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-black">{testimonial.name}</p>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{testimonial.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeIn}
            className="bg-teal-600 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-teal-500/40"
          >
            <div className="relative z-10 max-w-3xl mx-auto text-white">
              <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.95] tracking-tight">Gotowy na Idealną <br />Czystość?</h2>
              <p className="text-xl md:text-2xl text-teal-50 font-bold mb-14 opacity-90 max-w-2xl mx-auto">Dołącz do 12,000+ zadowolonych rodzin i odzyskaj swój czas wolny już dziś.</p>
              <Button
                size="lg"
                className="rounded-full px-16 h-20 text-xl font-black bg-white text-teal-600 hover:bg-teal-50 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Zarezerwuj Termin
              </Button>
            </div>

            {/* Visual background details for CTA */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-[-20%] left-[-10%] text-white/10 rotate-12"><Sparkles size={400} /></div>
              <div className="absolute bottom-[-20%] right-[-10%] text-white/10 -rotate-12"><Heart size={500} /></div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
