"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { SERIES } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const Series = React.memo(function Series() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        gsap.fromTo(
            sectionRef.current.querySelectorAll(".reveal-item"),
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

        // Grid parallax
        const grid = sectionRef.current.querySelector(".series-grid");
        if (grid) {
            gsap.fromTo(
                grid,
                { y: 40 },
                {
                    y: -40,
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

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="series"
            className="section-padding bg-surface border-t border-border"
        >
            <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6">
                <div className="reveal-item">
                    <SectionLabel>Favourite Web Series</SectionLabel>
                    <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light mb-14 leading-[1.1]">
                        Shows I love
                    </h2>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[18px] series-grid will-change-transform">
                    {SERIES.map((series) => (
                        <div
                            key={series.title}
                            className="reveal-item border border-border bg-surface overflow-hidden hover:-translate-y-1 hover:border-accent-lt transition-all duration-400 hover:shadow-[0_14px_44px_rgba(35,29,18,0.08)]"
                        >
                            {/* Thumbnail area */}
                            <div
                                className="aspect-video flex items-center justify-center font-display text-[1rem] text-surface/80"
                                style={{ backgroundColor: series.bg }}
                            >
                                {series.title}
                            </div>

                            {/* Body */}
                            <div className="p-5">
                                <h3 className="font-display text-[1.1rem] leading-[1.2] mb-2">
                                    {series.title}
                                </h3>
                                <p className="text-[0.72rem] text-muted">
                                    {series.genre} · {series.year} · {series.seasons}{" "}
                                    {series.seasons === 1 ? "season" : "seasons"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Series;
