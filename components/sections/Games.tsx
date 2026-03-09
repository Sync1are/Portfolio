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
            className="section-padding bg-bg border-t border-border"
        >
            <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6">
                <div className="reveal-item">
                    <SectionLabel>Favourite Video Games</SectionLabel>
                    <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light mb-14 leading-[1.1]">
                        Games I keep going back to
                    </h2>
                </div>

                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[2px]">
                    {GAMES.map((game) => (
                        <motion.div
                            key={game.title}
                            whileHover={{ x: 5, backgroundColor: "#EDE6D4" }}
                            className="reveal-item flex items-center gap-[22px] p-7 bg-bg border border-border transition-colors duration-400"
                        >
                            {/* Emoji icon */}
                            <div className="w-14 h-[74px] border border-border bg-card flex items-center justify-center text-[1.5rem] flex-shrink-0">
                                {game.emoji}
                            </div>

                            {/* Info */}
                            <div>
                                <h3 className="font-display text-[1.1rem] leading-[1.2] mb-1">
                                    {game.title}
                                </h3>
                                <p className="text-[0.78rem] text-muted leading-[1.6]">
                                    {game.description}
                                </p>
                                <span className="block text-[0.63rem] tracking-[0.12em] uppercase text-accent mt-[7px]">
                                    {game.genre}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Games;
