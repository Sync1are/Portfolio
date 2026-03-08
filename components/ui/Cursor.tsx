"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function Cursor() {
    const [hovering, setHovering] = useState(false);

    // Exact mouse position for the dot
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring interpolated position for the ring
    const ringX = useSpring(mouseX, { stiffness: 100, damping: 15, mass: 0.5 });
    const ringY = useSpring(mouseY, { stiffness: 100, damping: 15, mass: 0.5 });

    useEffect(() => {
        const isTouchDevice =
            typeof window !== "undefined" &&
            ("ontouchstart" in window || navigator.maxTouchPoints > 0);

        if (isTouchDevice) return;

        const onMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (target?.closest("a, button, [data-cursor-hover]")) {
                setHovering(true);
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = e.relatedTarget as HTMLElement | null;
            if (!target?.closest("a, button, [data-cursor-hover]")) {
                setHovering(false);
            }
        };

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
        };
    }, [mouseX, mouseY]);

    // Handle touch device check for rendering
    const isTouchDevice =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (isTouchDevice) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: hovering ? 1.6 : 1,
                }}
                transition={{
                    scale: { type: "spring", stiffness: 400, damping: 25 }
                }}
            />
            <motion.div
                className={`fixed top-0 left-0 w-[30px] h-[30px] rounded-full border pointer-events-none z-[9999] ${hovering ? "border-accent opacity-80" : "border-accent opacity-55"}`}
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: hovering ? 1.25 : 1,
                }}
                transition={{
                    scale: { type: "spring", stiffness: 400, damping: 25 },
                    opacity: { duration: 0.2 },
                    borderColor: { duration: 0.2 }
                }}
            />
        </>
    );
}
