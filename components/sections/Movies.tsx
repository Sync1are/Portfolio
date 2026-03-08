"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { MOVIES } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const Movies = React.memo(function Movies() {
    const sectionRef = useRef<HTMLElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="movies"
            className="section-padding border-t border-border relative transition-colors duration-700 w-full"
            style={{
                backgroundColor: hoveredIndex !== null ? MOVIES[hoveredIndex].bg : "var(--color-bg)",
            }}
        >
            <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6 relative z-10">
                <div className="reveal-item mb-20">
                    <SectionLabel>
                        <span className={`transition-colors duration-700 ${hoveredIndex !== null ? "text-[#EDE6D4]/60" : "text-muted"}`}>
                            Favourite Movies
                        </span>
                    </SectionLabel>
                    <h2 className={`font-display text-[2.8rem] max-sm:text-[2rem] font-light leading-[1.1] transition-colors duration-700 ${hoveredIndex !== null ? "text-[#EDE6D4]" : "text-ink"}`}>
                        Films that shaped me
                    </h2>
                </div>

                <div
                    className="border-t transition-colors duration-700"
                    style={{ borderColor: hoveredIndex !== null ? 'rgba(237, 230, 212, 0.2)' : 'var(--color-border)' }}
                >
                    {MOVIES.map((movie, idx) => (
                        <div
                            key={movie.title}
                            className="reveal-item group relative border-b transition-colors duration-700"
                            style={{ borderColor: hoveredIndex !== null ? 'rgba(237, 230, 212, 0.2)' : 'var(--color-border)' }}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer relative z-10 w-full overflow-hidden">

                                <div className="flex items-baseline gap-6 md:gap-12 relative z-10">
                                    <span className={`font-display italic text-[1.5rem] md:text-[2rem] transition-colors duration-500 ${hoveredIndex !== null ? (hoveredIndex === idx ? "text-[#EDE6D4]" : "text-[#EDE6D4]/40") : "text-muted"}`}>
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>
                                    <h3
                                        className={`font-display text-[2.5rem] md:text-[4.5rem] leading-[1.1] tracking-tight transition-all duration-500
                                        ${hoveredIndex !== null ? (hoveredIndex === idx ? "text-[#EDE6D4] translate-x-3 md:translate-x-6" : "text-[#EDE6D4]/30") : "text-ink"}`}
                                    >
                                        {movie.title}
                                    </h3>
                                </div>

                                <div className={`flex flex-col text-left md:text-right relative z-10 transition-all duration-500
                                    ${hoveredIndex !== null ? (hoveredIndex === idx ? "text-[#EDE6D4] opacity-100" : "text-[#EDE6D4] opacity-0") : "text-muted opacity-60 md:opacity-100"}`}>
                                    <span className="text-[0.9rem] uppercase tracking-[0.15em] mb-1">{movie.director}</span>
                                    <span className="font-display italic text-[1.2rem]">{movie.year}</span>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Movies;
