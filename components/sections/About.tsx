"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { PERSON, LANGUAGES, STATS } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const About = React.memo(function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const barsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Section reveal
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

            // Language bars
            barsRef.current.forEach((bar, i) => {
                if (!bar) return;
                gsap.fromTo(
                    bar,
                    { scaleX: 0 },
                    {
                        scaleX: LANGUAGES[i].percent / 100,
                        duration: 1.1,
                        ease: "power2.out",
                        delay: i * 0.12,
                        scrollTrigger: {
                            trigger: bar,
                            start: "top 90%",
                        },
                    }
                );
            });

            // Stats Grid Parallax
            const statsGrid = sectionRef.current?.querySelector(".stats-grid");
            if (statsGrid) {
                gsap.fromTo(
                    statsGrid,
                    { y: 50 },
                    {
                        y: -50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            }

            // Bio Highlight Scroll Effect
            const bioParas = sectionRef.current?.querySelectorAll(".bio-content p") || [];
            bioParas.forEach((p) => {
                const strongs = p.querySelectorAll("strong");
                gsap.fromTo(
                    strongs,
                    { color: "var(--color-muted)" },
                    {
                        color: "var(--color-ink)",
                        scrollTrigger: {
                            trigger: p,
                            start: "top 85%",
                            end: "top 30%",
                            scrub: true,
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="section-padding bg-surface border-t border-border"
        >
            <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6">
                <div className="reveal-item">
                    <SectionLabel>About Me</SectionLabel>
                    <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light mb-14 leading-[1.1]">
                        A bit about who I am
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16">
                    {/* Left column — Bio & Languages */}
                    <div>
                        <div className="space-y-6 mb-14 bio-content">
                            {PERSON.bio.map((para, i) => (
                                <p
                                    key={i}
                                    className="reveal-item text-muted leading-[1.95] text-[0.92rem] [&>strong]:transition-colors [&>strong]:duration-500 [&>strong]:font-medium"
                                    dangerouslySetInnerHTML={{ __html: para }}
                                />
                            ))}
                        </div>

                        {/* Languages */}
                        <div className="reveal-item">
                            <span className="block text-[0.68rem] tracking-[0.22em] uppercase text-muted font-body mb-6">
                                Languages I Speak
                            </span>
                            <div className="space-y-4">
                                {LANGUAGES.map((lang, i) => (
                                    <div key={lang.name} className="flex items-center gap-4">
                                        <span className="w-20 text-[0.82rem] text-ink">
                                            {lang.name}
                                        </span>
                                        <div className="flex-1 h-[2px] bg-border relative">
                                            <div
                                                ref={(el) => { barsRef.current[i] = el; }}
                                                className="h-full bg-accent rounded-sm origin-left"
                                                style={{ transform: "scaleX(0)" }}
                                            />
                                        </div>
                                        <span className="w-20 text-right text-[0.68rem] text-muted">
                                            {lang.level}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column — Stats grid */}
                    <div className="flex flex-col gap-[2px] reveal-item stats-grid will-change-transform">
                        <div className="border border-border overflow-hidden h-[300px] mb-[2px] relative group bg-surface">
                            <img
                                src="/assets/images/avatar.jpg"
                                alt={PERSON.name}
                                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-[2px]">
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="border border-border bg-surface p-9 hover:bg-card transition-colors duration-400"
                                >
                                    <span className="block font-display text-[2.8rem] font-light leading-none">
                                        {stat.value}
                                    </span>
                                    <span className="block text-[0.68rem] tracking-[0.16em] uppercase text-muted mt-2">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default About;
