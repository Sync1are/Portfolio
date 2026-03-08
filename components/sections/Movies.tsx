"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { MOVIES } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const Movies = React.memo(function Movies() {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !scrollContainerRef.current) return;

        const scrollContainer = scrollContainerRef.current;

        // Calculate how far to scroll based on total width difference
        const getScrollAmount = () => {
            const containerWidth = scrollContainer.scrollWidth;
            const windowWidth = window.innerWidth;
            return -(containerWidth - windowWidth + 100); // 100px padding
        };

        // Horizontal scroll pinning
        const tween = gsap.to(scrollContainer, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${getScrollAmount() * -1}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true, // Recalculate on resize
            },
        });

        // Intro reveal
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
            // Safely kill the specific tween we created for pinning to avoid memory leaks
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="movies"
            className="bg-bg border-t border-border overflow-hidden h-screen flex flex-col justify-center relative"
        >
            <div className="absolute top-24 left-11 max-sm:left-6 max-sm:top-16 z-10 w-full pointer-events-none">
                <div className="reveal-item">
                    <SectionLabel>Favourite Movies</SectionLabel>
                    <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light leading-[1.1]">
                        Films that shaped me
                    </h2>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex gap-8 px-11 max-sm:px-6 w-max mt-20 items-center overflow-visible will-change-transform"
                style={{ paddingRight: "100px" }}
            >
                {MOVIES.map((movie) => (
                    <div
                        key={movie.title}
                        className="w-[300px] h-[450px] max-sm:w-[240px] max-sm:h-[360px] flex-shrink-0 overflow-hidden relative cursor-pointer group"
                        style={{ backgroundColor: movie.bg }}
                    >
                        {/* Poster placeholder */}
                        {movie.poster ? (
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06] sepia-[0.12] group-hover:sepia-0"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center font-display text-[1.1rem] text-surface/80 transition-transform duration-500 group-hover:scale-[1.06]">
                                {movie.title}
                            </div>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(25,19,10,0.88)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                            <h3 className="font-display text-[1.3rem] text-surface translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                                {movie.title}
                            </h3>
                            <p className="text-[0.78rem] text-surface/60 mt-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-400 delay-75">
                                {movie.director} · {movie.year}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

export default Movies;
