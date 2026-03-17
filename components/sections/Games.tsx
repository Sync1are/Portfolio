"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { GAMES } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const Games = React.memo(function Games() {
    const sectionRef = useRef<HTMLElement>(null);
    const [featuredGame, ...supportingGames] = GAMES;

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".reveal-item",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="games"
            className="section-padding bg-bg border-t border-border overflow-hidden"
        >
            <div className="max-w-[1240px] mx-auto px-11 max-sm:px-6">
                <div className="reveal-item mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <SectionLabel>Favourite Video Games</SectionLabel>
                        <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light leading-[1.05]">
                            Games I keep going back to
                        </h2>
                    </div>
                    <p className="max-w-[440px] text-[0.82rem] leading-[1.8] text-muted">
                        A compact editorial spread built like a shelf note: one personal
                        favourite given room to breathe, four others kept close at hand.
                    </p>
                </div>

                <div className="reveal-item relative overflow-hidden rounded-[32px] border border-[#2B2620] bg-[#11100D] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.34)] sm:p-4 lg:p-5">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(204,128,44,0.14),transparent_38%),radial-gradient(circle_at_80%_10%,rgba(173,42,28,0.22),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
                        <div className="absolute inset-x-5 top-5 h-px bg-white/8" />
                        <div className="absolute inset-x-5 bottom-5 h-px bg-white/6" />
                    </div>

                    <div className="relative grid gap-3 sm:gap-4 md:aspect-[16/9] md:grid-rows-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-5">
                        <motion.article
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="group relative isolate min-h-[320px] overflow-hidden rounded-[24px] border border-white/8 bg-[#18130F] md:min-h-0"
                        >
                            <img
                                src={featuredGame.hero ?? featuredGame.cover}
                                alt={featuredGame.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,5,4,0.92)_0%,rgba(7,5,4,0.7)_38%,rgba(7,5,4,0.14)_72%,rgba(7,5,4,0.1)_100%)]" />
                            <div className="absolute inset-y-0 left-[44%] hidden w-px bg-white/10 lg:block" />

                            <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6 lg:p-8">
                                <div className="flex flex-wrap items-center gap-2 text-[0.64rem] uppercase tracking-[0.26em] text-white/68">
                                    <span className="rounded-full border border-white/16 bg-black/18 px-3 py-1 text-[0.58rem] text-white/78">
                                        Personal Favourite
                                    </span>
                                    <span>{featuredGame.genre}</span>
                                    <span className="text-white/30">/</span>
                                    <span>{featuredGame.year}</span>
                                </div>

                                <div className="max-w-[420px]">
                                    <h3 className="font-display text-[clamp(2.35rem,4.7vw,4.9rem)] leading-[0.94] text-white">
                                        {featuredGame.title}
                                    </h3>
                                    <p className="mt-4 max-w-[34ch] text-[0.82rem] leading-[1.75] text-white/76 sm:text-[0.88rem]">
                                        {featuredGame.description}
                                    </p>
                                </div>

                                <div className="flex items-end justify-between gap-6 pt-6">
                                    <p className="max-w-[26ch] text-[0.68rem] uppercase tracking-[0.22em] text-white/42">
                                        A world I return to for the slowness, the weather, and the
                                        feeling that nothing has been rushed.
                                    </p>
                                    <span className="hidden font-display text-[1.1rem] italic text-white/70 sm:block">
                                        01
                                    </span>
                                </div>
                            </div>
                        </motion.article>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
                            {supportingGames.map((game, index) => (
                                <motion.article
                                    key={game.title}
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.28, ease: "easeOut" }}
                                    className="group relative isolate overflow-hidden rounded-[22px] border border-white/10 bg-[#18130F]"
                                >
                                    <img
                                        src={game.cover}
                                        alt={game.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,5,0.06)_0%,rgba(8,7,5,0.16)_40%,rgba(8,7,5,0.92)_100%)]" />
                                    <div className="relative flex h-full min-h-[170px] flex-col justify-between p-4 sm:min-h-[220px] md:min-h-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="rounded-full border border-white/14 bg-black/18 px-2.5 py-1 text-[0.56rem] uppercase tracking-[0.24em] text-white/62">
                                                {String(index + 2).padStart(2, "0")}
                                            </span>
                                            <span className="text-[0.58rem] uppercase tracking-[0.18em] text-white/42">
                                                {game.year}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="font-display text-[1.1rem] leading-[1.02] text-white sm:text-[1.32rem]">
                                                {game.title}
                                            </h3>
                                            <p className="mt-2 text-[0.63rem] uppercase tracking-[0.18em] text-white/58">
                                                {game.genre}
                                            </p>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Games;
