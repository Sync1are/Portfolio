"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Beams } from "@/components/ui/ethereal-beams-hero";
import { WEB_PROJECTS } from "@/data";

/**
 *  FeaturedProject
 *  ───────────────
 *  A cinematic 3 D reveal of the flagship web project.
 *  Uses ContainerScroll to rotate a live-site iframe into view
 *  as the visitor scrolls, bridging Skills → Projects.
 */
const FeaturedProject = React.memo(function FeaturedProject() {
    const featured = WEB_PROJECTS[0]; // Sperun — Creative Studio

    return (
        <section
            id="featured-project"
            className="relative overflow-hidden no-count"
            style={{ background: "#0a0a0a" }}
        >
            {/* Ethereal Beams Background */}
            <div className="absolute inset-0 z-0 opacity-60">
                <Beams
                    beamWidth={2}
                    beamHeight={15}
                    beamNumber={12}
                    lightColor="#ffffff"
                    speed={1.5}
                    noiseIntensity={1.75}
                    scale={0.15}
                    rotation={30}
                />
            </div>

            <div className="relative z-10">
            <ContainerScroll
                titleComponent={
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[0.68rem] tracking-[0.22em] uppercase text-neutral-500 font-body">
                            Featured Project
                        </span>
                        <h2 className="text-4xl md:text-[4rem] font-display font-light leading-[1.05] tracking-[-0.02em] bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                            {featured.title}
                        </h2>
                        <p className="text-neutral-400 text-base md:text-lg max-w-xl leading-relaxed">
                            {featured.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                            {featured.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[0.63rem] tracking-[0.1em] uppercase border border-neutral-700 px-3 py-1 text-neutral-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                }
            >
                {/* Live iframe of the featured site */}
                {featured.iframeUrl ? (
                    <iframe
                        src={featured.iframeUrl}
                        className="w-full h-full border-none"
                        title={featured.title}
                        loading="lazy"
                    />
                ) : (
                    /* Fallback: Unsplash image that's known to exist */
                    <img
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&h=720&fit=crop"
                        alt={featured.title}
                        className="mx-auto rounded-2xl object-cover h-full w-full object-left-top"
                        draggable={false}
                    />
                )}
            </ContainerScroll>
            </div>
        </section>
    );
});

export default FeaturedProject;
