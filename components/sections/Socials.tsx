"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { SOCIALS } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const Socials = React.memo(function Socials() {
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
                    stagger: 0.08,
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
            id="socials"
            className="section-padding bg-bg border-t border-border"
        >
            <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6">
                <div className="reveal-item">
                    <SectionLabel>Connect</SectionLabel>
                    <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light mb-14 leading-[1.1]">
                        Find me elsewhere
                    </h2>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[2px]">
                    {SOCIALS.map((social) => (
                        <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="reveal-item relative p-7 bg-surface border border-border transition-all duration-400 no-underline group block hover:-translate-y-[3px] hover:bg-hover hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)]"
                        >
                            {/* External link indicator */}
                            <span className="absolute top-[18px] right-[18px] text-accent text-[0.85rem] opacity-0 translate-y-[5px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                ↗
                            </span>

                            {/* Icon */}
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-[26px] h-[26px] text-muted mb-4"
                            >
                                <path d={social.icon} />
                            </svg>

                            {/* Platform name */}
                            <h3 className="font-display text-[1.2rem] text-ink leading-[1.2] mb-1">
                                {social.platform}
                            </h3>

                            {/* Handle */}
                            <p className="text-[0.76rem] text-muted">{social.handle}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Socials;
