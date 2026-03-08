"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

export default function FloatingCTA() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setIsScrolled(latest > 100);
        });
    }, [scrollY]);

    return (
        <motion.a
            href="mailto:hello@azesynclare.com"
            className="fixed bottom-8 right-8 z-[9990] flex items-center justify-center rounded-full overflow-hidden mix-blend-difference border-[1.5px] border-[#EDE6D4] text-[#EDE6D4]"
            style={{
                backgroundColor: "transparent"
            }}
            animate={{
                width: isScrolled ? "54px" : "170px",
                height: "54px",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
        >
            <motion.div
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
                animate={{
                    opacity: isScrolled ? 0 : 1,
                    scale: isScrolled ? 0.8 : 1,
                }}
                transition={{ duration: 0.2 }}
            >
                <div className="w-2 h-2 rounded-full bg-green-500 mr-3 animate-pulse" />
                <span className="text-[0.8rem] font-medium tracking-[0.1em] uppercase">Say Hello</span>
            </motion.div>
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                    opacity: isScrolled ? 1 : 0,
                    scale: isScrolled ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
            </motion.div>
        </motion.a>
    );
}
