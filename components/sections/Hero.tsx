"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSON } from "@/data";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

gsap.registerPlugin(ScrollTrigger);

const Hero = React.memo(function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const eyebrowRef = useRef<HTMLSpanElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const ruleRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const ghostRef = useRef<HTMLSpanElement>(null);
    const canvasWrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

            // Canvas fade in
            if (canvasWrapRef.current) {
                tl.fromTo(
                    canvasWrapRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 1.2 },
                    0
                );
            }

            // Eyebrow
            if (eyebrowRef.current) {
                tl.fromTo(
                    eyebrowRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6 },
                    0.4
                );
            }

            // Name line 1 — cinematic slide up
            if (line1Ref.current) {
                tl.fromTo(
                    line1Ref.current,
                    { y: "105%" },
                    { y: "0%", duration: 0.8, ease: "power3.out" },
                    0.55
                );
            }

            // Name line 2
            if (line2Ref.current) {
                tl.fromTo(
                    line2Ref.current,
                    { y: "105%" },
                    { y: "0%", duration: 0.8, ease: "power3.out" },
                    0.75
                );
            }

            // Accent rule
            if (ruleRef.current) {
                tl.fromTo(
                    ruleRef.current,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    1.05
                );
            }

            // Tagline
            if (taglineRef.current) {
                tl.fromTo(
                    taglineRef.current,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    1.15
                );
            }

            // Scroll indicator
            if (scrollRef.current) {
                tl.fromTo(
                    scrollRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    1.6
                );
            }

            // Ghost text float
            if (ghostRef.current) {
                gsap.to(ghostRef.current, {
                    y: 20,
                    duration: 3.5,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                });

                // Parallax for ghost text
                gsap.to(ghostRef.current, {
                    y: 150,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            }

            // Parallax for canvas
            if (canvasWrapRef.current) {
                gsap.to(canvasWrapRef.current, {
                    y: "30%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden bg-black/[0.96]"
        >
            {/* Spotlight effect */}
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            {/* Spline 3D Background */}
            <div ref={canvasWrapRef} className="absolute inset-0 z-0 opacity-0">
                <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                />
            </div>

            {/* Ghost watermark */}
            <span
                ref={ghostRef}
                className="absolute right-[-10px] top-1/2 -translate-y-1/2 font-display font-light pointer-events-none opacity-[0.12] z-[1] select-none hidden lg:block"
                style={{
                    fontSize: "clamp(8rem, 22vw, 22rem)",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)",
                }}
            >
                HELLO
            </span>

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1180px] mx-auto px-11 max-sm:px-6 py-32 flex flex-col items-center justify-center text-center">
                {/* Eyebrow */}
                <span
                    ref={eyebrowRef}
                    className="block text-[0.72rem] tracking-[0.26em] uppercase text-neutral-400 font-bold mb-10 opacity-0"
                >
                    Welcome to my world
                </span>

                {/* Name */}
                <h1 className="font-display font-light leading-[0.98] tracking-[-0.025em] mb-14 flex flex-col items-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                    style={{ fontSize: "clamp(5rem, 15vw, 13rem)" }}
                >
                    <span className="block overflow-hidden pb-2">
                        <span ref={line1Ref} className="block" style={{ transform: "translateY(105%)" }}>
                            {PERSON.firstName}
                        </span>
                    </span>
                    <span className="block overflow-hidden pb-4">
                        <span
                            ref={line2Ref}
                            className="block italic text-accent"
                            style={{ transform: "translateY(105%)" }}
                        >
                            {PERSON.lastName}
                        </span>
                    </span>
                </h1>

                <div className="flex flex-col items-center text-center max-w-[460px]">
                    {/* Accent rule */}
                    <div ref={ruleRef} className="w-16 h-[1px] bg-neutral-500 mb-6 opacity-0" />

                    {/* Tagline */}
                    <p
                        ref={taglineRef}
                        className="text-neutral-300 leading-[1.85] text-[0.95rem] opacity-0 text-center"
                    >
                        {PERSON.tagline}
                    </p>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                ref={scrollRef}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 z-10"
            >
                <span className="text-[0.63rem] tracking-[0.22em] uppercase text-neutral-500">
                    Scroll
                </span>
                <div className="w-[1px] h-[44px] bg-neutral-700 relative overflow-hidden">
                    <div className="w-full h-full bg-neutral-400 animate-scroll-fill" />
                </div>
            </div>
        </section>
    );
});

export default Hero;
