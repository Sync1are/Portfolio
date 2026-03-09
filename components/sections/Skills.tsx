"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { SKILLS } from "@/data";
import { LogoLoop } from "@/components/ui/LogoLoop";

gsap.registerPlugin(ScrollTrigger);

const Skills = React.memo(function Skills() {
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
                stagger: 0.06,
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
            id="skills"
            className="py-[120px] max-sm:py-[80px] bg-bg border-t border-border overflow-hidden"
        >
            <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6">
                <div className="reveal-item">
                    <SectionLabel>Skills & Tools</SectionLabel>
                    <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light mb-14 leading-[1.1]">
                        Things I work with
                    </h2>
                </div>
            </div>

            {/* Infinite Marquee */}
            <div className="reveal-item relative w-full overflow-hidden mt-6 h-20 flex items-center">
                <LogoLoop
                    logos={SKILLS.map((skill, index) => ({
                        node: (
                            <span className="relative border border-border px-6 py-3 text-[0.85rem] tracking-[0.08em] text-muted overflow-hidden transition-all duration-400 hover:text-ink hover:border-accent-lt hover:bg-card group cursor-pointer inline-block">
                                {skill}
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-[width] duration-400 group-hover:w-full" />
                            </span>
                        )
                    }))}
                    speed={60}
                    direction="left"
                    logoHeight={56}
                    gap={10}
                    pauseOnHover={false}
                    hoverSpeed={0} // Stops playing on hover
                    scaleOnHover={false}
                    fadeOut={true}
                    fadeOutColor="var(--bg)"
                />
            </div>
        </section>
    );
});

export default Skills;
