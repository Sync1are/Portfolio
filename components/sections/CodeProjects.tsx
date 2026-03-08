"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { CODE_PROJECTS } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const CodeProjects = React.memo(function CodeProjects() {
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
    }, []);

    return (
        <section
            ref={sectionRef}
            id="code-projects"
            className="section-padding bg-bg border-t border-border"
        >
            <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6">
                <div className="reveal-item">
                    <SectionLabel>Python & Code</SectionLabel>
                    <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light mb-14 leading-[1.1]">
                        Scripts, tools & experiments
                    </h2>
                </div>

                <div className="divide-y divide-border">
                    {CODE_PROJECTS.map((project, i) => (
                        <div
                            key={project.title}
                            className="reveal-item grid grid-cols-[56px_1fr_auto] items-center gap-8 py-[26px] hover:pl-3 transition-[padding] duration-300 max-sm:grid-cols-[40px_1fr] max-sm:gap-4"
                        >
                            {/* Row number */}
                            <span className="font-display text-[2rem] font-light text-border leading-none">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            {/* Info */}
                            <div>
                                <h3 className="font-display text-[1.25rem] leading-[1.3] mb-1">
                                    {project.title}
                                </h3>
                                <p className="text-[0.81rem] text-muted leading-[1.6]">
                                    {project.description}
                                </p>
                            </div>

                            {/* Stack */}
                            <span className="text-[0.68rem] tracking-[0.1em] uppercase text-accent whitespace-nowrap max-sm:hidden">
                                {project.stack}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default CodeProjects;
