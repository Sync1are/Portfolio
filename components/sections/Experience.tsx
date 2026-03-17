"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import SectionLabel from "@/components/ui/SectionLabel";
import { EXPERIENCE } from "@/data";

const ExperienceTimeline = React.memo(function ExperienceTimeline() {
    const data = EXPERIENCE.map((exp) => ({
        title: exp.year,
        content: (
            <div>
                {/* Type badge */}
                <span className="inline-block text-[0.62rem] tracking-[0.15em] uppercase text-accent font-body px-2.5 py-1 rounded-full border border-accent/20 bg-accent/5 mb-4">
                    {exp.type}
                </span>

                {/* Title & Org */}
                <h4 className="font-display text-xl md:text-2xl leading-[1.2] mb-1">
                    {exp.title}
                </h4>
                <span className="text-[0.8rem] text-accent/70 font-body tracking-wide">
                    {exp.org}
                </span>

                {/* Description */}
                <p className="mt-3 text-muted text-xs md:text-sm font-body leading-[1.7] max-w-lg">
                    {exp.description}
                </p>

                {/* Tags */}
                {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-5">
                        {exp.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[0.6rem] tracking-[0.08em] uppercase px-2.5 py-1 rounded-full border border-border/50 text-muted font-body"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        ),
    }));

    return (
        <section id="experience" className="section-padding bg-bg border-t border-border relative overflow-hidden">
            {/* HeroGeometric Background - Positioned behind content */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <HeroGeometric backgroundOnly />
            </div>

            <div className="relative z-10">
                <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6">
                    <SectionLabel>Journey</SectionLabel>
                    <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light mb-4 leading-[1.1]">
                        Experience &amp; education
                    </h2>
                    <p className="text-muted text-sm md:text-base max-w-md mb-6 font-body">
                        A timeline of the roles, projects, and learning that shaped where I am today.
                    </p>
                </div>
                <Timeline data={data} />
            </div>
        </section>
    );
});

export default ExperienceTimeline;
