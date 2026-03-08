"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { HOBBIES } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const Hobbies = React.memo(function Hobbies() {
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
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                },
            }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            id="hobbies"
            className="section-padding bg-surface border-t border-border"
        >
            <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6">
                <div className="reveal-item">
                    <SectionLabel>Hobbies</SectionLabel>
                    <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light mb-14 leading-[1.1]">
                        Beyond the screen
                    </h2>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[2px]">
                    {HOBBIES.map((hobby) => (
                        <div
                            key={hobby.title}
                            className="reveal-item p-10 bg-surface border border-border hover:bg-card transition-colors duration-400"
                        >
                            <span className="block text-[1.9rem] mb-4">{hobby.emoji}</span>
                            <h3 className="font-display text-[1.3rem] leading-[1.2] mb-[9px]">
                                {hobby.title}
                            </h3>
                            <p className="text-[0.82rem] text-muted leading-[1.75]">
                                {hobby.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Hobbies;
