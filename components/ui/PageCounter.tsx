"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageCounter() {
    const [currentSection, setCurrentSection] = useState(1);
    const [totalSections, setTotalSections] = useState(1);

    useEffect(() => {
        // Wait a tick for DOM to be fully loaded
        setTimeout(() => {
            const sections = Array.from(document.querySelectorAll("section[id]")).filter(
                s => s.id !== "nav" && (!s.classList.contains("no-count"))
            );

            if (sections.length > 0) {
                setTotalSections(sections.length);
            }

            const observer = new IntersectionObserver((entries) => {
                let maxRatio = 0;
                let bestMatch = -1;

                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        const index = sections.findIndex(s => s.id === entry.target.id);
                        if (index !== -1) {
                            bestMatch = index;
                        }
                    }
                });

                if (bestMatch !== -1) {
                    setCurrentSection(bestMatch + 1);
                }
            }, { threshold: [0.1, 0.3, 0.5, 0.8] });

            sections.forEach(sec => observer.observe(sec));

            return () => observer.disconnect();
        }, 100);
    }, []);

    const formatNumber = (num: number) => num.toString().padStart(2, "0");

    return (
        <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[9000] hidden lg:flex flex-col items-center gap-4 text-muted pointer-events-none mix-blend-difference opacity-70">
            <div className="relative h-8 w-12 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={`current-${currentSection}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="font-display italic text-[1.4rem] absolute text-accent"
                    >
                        {formatNumber(currentSection)}
                    </motion.span>
                </AnimatePresence>
            </div>

            <div className="w-[1px] h-20 bg-border relative overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-full bg-accent"
                    initial={{ height: 0 }}
                    animate={{ height: `${(currentSection / totalSections) * 100}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                />
            </div>

            <div className="h-8 w-12 flex items-center justify-center">
                <span className="font-display italic text-[1.1rem]">
                    {formatNumber(totalSections)}
                </span>
            </div>

            {/* Flash transition number */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[8000] mix-blend-difference overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`flash-${currentSection}`}
                        initial={{ opacity: 0, scale: 0.8, y: 50, filter: "blur(10px)" }}
                        animate={{ opacity: 0.15, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.1, y: -50, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display italic text-[30vw] leading-none text-accent"
                    >
                        {formatNumber(currentSection)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
