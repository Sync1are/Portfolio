"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSON } from "@/data";
import { gsap } from "gsap";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        const text = PERSON.name;
        if (textRef.current) {
            // Split text into spans
            textRef.current.innerHTML = text.split("").map(char =>
                `<span class="inline-block opacity-0 translate-y-4">${char === " " ? "&nbsp;" : char}</span>`
            ).join("");

            // Animate letters
            gsap.to(textRef.current.querySelectorAll("span"), {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
                onComplete: () => {
                    // Small pause after reveal before fading out
                    setTimeout(() => {
                        setIsLoading(false);
                        document.body.style.overflow = "";
                    }, 500);
                }
            });
        }

        // Failsafe backup timeout
        const timeout = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
        }, 2500);

        return () => {
            clearTimeout(timeout);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-bg"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div
                        ref={textRef}
                        className="font-display text-[2rem] tracking-[0.2em] uppercase text-ink"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
