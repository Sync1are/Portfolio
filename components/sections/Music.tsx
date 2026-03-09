"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import FlowingMenu from "@/components/ui/FlowingMenu";
import { SONGS } from "@/data";
import { hexToRgba } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const EQUALIZER_HEIGHTS = ["h-3", "h-5", "h-2", "h-4", "h-3"];
const EQUALIZER_DELAYS = ["0s", "0.15s", "0.3s", "0.1s", "0.25s"];

const Music = React.memo(function Music() {
    const sectionRef = useRef<HTMLElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [sectionBg, setSectionBg] = useState("transparent");
    const audioRef = useRef<HTMLAudioElement | null>(null);

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

    const onHover = (index: number) => {
        setHoveredIndex(index);
        const song = SONGS[index];
        setSectionBg(hexToRgba(song.color, 0.07));

        if (song.audio) {
            audioRef.current = new Audio(song.audio);
            audioRef.current.volume = 0.4;
            audioRef.current.play().catch(() => { });
        }
    };

    const onLeave = () => {
        setHoveredIndex(null);
        setSectionBg("transparent");

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
        }
    };

    return (
        <motion.section
            ref={sectionRef}
            id="music"
            className="relative section-padding border-t border-border overflow-hidden"
            animate={{ backgroundColor: sectionBg }}
            transition={{ duration: 0.9 }}
            style={{ backgroundColor: "transparent" }}
        >
            {/* Blurred Background Image */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <AnimatePresence>
                    {hoveredIndex !== null && SONGS[hoveredIndex].image && (
                        <motion.div
                            key={`bg-${hoveredIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.25 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 mix-blend-screen"
                        >
                            <img
                                src={SONGS[hoveredIndex].image}
                                alt=""
                                className="w-full h-full object-cover blur-[100px] scale-[1.2]"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative z-10 w-full">
                <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6">
                    <div className="reveal-item">
                        <SectionLabel>Music</SectionLabel>
                        <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light mb-14 leading-[1.1]">
                            What I listen to
                        </h2>
                    </div>
                </div>

                <div className="reveal-item w-full">
                    <FlowingMenu
                        items={SONGS.map((song, i) => ({
                            link: '#',
                            marqueeText: `${song.title} ✦ ${song.artist} ✦ `,
                            image: song.image || '',
                            onMouseEnter: () => onHover(i),
                            onMouseLeave: onLeave,
                            content: (
                                <div className="w-full max-w-[1180px] mx-auto px-11 max-sm:px-6">
                                    <div className="w-full text-left grid grid-cols-[68px_1fr_auto] items-center gap-[26px] py-[22px] cursor-pointer transition-[padding] duration-300 max-sm:grid-cols-[50px_1fr] hover:pl-[10px]">
                                        {/* Album art placeholder */}
                                        <motion.div
                                            className="w-[68px] h-[68px] max-sm:w-[50px] max-sm:h-[50px] border border-border bg-card overflow-hidden flex items-center justify-center text-[1.6rem] flex-shrink-0 relative"
                                            animate={{ scale: hoveredIndex === i ? 1.06 : 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {song.image ? (
                                                <img
                                                    src={song.image}
                                                    alt={song.album}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                song.emoji
                                            )}
                                        </motion.div>

                                        {/* Song info */}
                                        <div>
                                            <h3 className="font-display text-[1.3rem] leading-[1.2]">
                                                {song.title}
                                            </h3>
                                            <p className="text-[0.78rem] text-muted mt-[2px]">
                                                {song.artist}
                                            </p>
                                            <p className="text-[0.72rem] text-accent-lt mt-[1px]">
                                                {song.album}
                                            </p>
                                        </div>

                                        {/* Equaliser bars */}
                                        <div className="hidden sm:flex gap-[3px] items-end h-5">
                                            <AnimatePresence>
                                                {hoveredIndex === i &&
                                                    EQUALIZER_HEIGHTS.map((h, j) => (
                                                        <motion.span
                                                            key={j}
                                                            initial={{ opacity: 0, scaleY: 0 }}
                                                            animate={{ opacity: 1, scaleY: 1 }}
                                                            exit={{ opacity: 0, scaleY: 0 }}
                                                            transition={{ duration: 0.2, delay: j * 0.05 }}
                                                            className={`w-[3px] ${h} bg-accent rounded-sm origin-bottom`}
                                                            style={{
                                                                animation: `mbar 0.8s ease-in-out infinite`,
                                                                animationDelay: EQUALIZER_DELAYS[j],
                                                            }}
                                                        />
                                                    ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            )
                        }))}
                        speed={15}
                        textColor="var(--ink)"
                        bgColor="transparent"
                        marqueeBgColor="var(--accent)"
                        marqueeTextColor="var(--bg)"
                        borderColor="var(--border)"
                    />
                </div>

                <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6">
                    <p className="text-[0.72rem] italic text-muted mt-7 reveal-item">
                        Hover a song to feel its colour.
                    </p>
                </div>
            </div>
        </motion.section>
    );
});

export default Music;
