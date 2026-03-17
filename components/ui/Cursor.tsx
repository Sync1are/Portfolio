"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function Cursor() {
    const [hovering, setHovering] = useState(false);
    const [ready, setReady] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(true);

    // Exact mouse position for the dot
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring interpolated position for the ring
    const ringX = useSpring(mouseX, { stiffness: 100, damping: 15, mass: 0.5 });
    const ringY = useSpring(mouseY, { stiffness: 100, damping: 15, mass: 0.5 });

    // Trail dots refs
    const trailCount = 6;
    const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
    // Keep history
    const historyRef = useRef<{ x: number, y: number }[]>(Array(20).fill({ x: -100, y: -100 }));

    useEffect(() => {
        const touchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;

        setIsTouchDevice(touchDevice);
        setReady(true);

        if (touchDevice) return;

        let frameId: number;

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

        const updateTrail = () => {
            const history = historyRef.current;
            // Shift history
            history.unshift({ x: mouseX.get(), y: mouseY.get() });
            history.pop();

            trailRefs.current.forEach((ref, index) => {
                if (ref) {
                    // Pick a point in history based on index (index * multiplier)
                    const point = history[index * 2] || history[history.length - 1];
                    ref.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`;
                }
            });

            frameId = requestAnimationFrame(updateTrail);
        };

        frameId = requestAnimationFrame(updateTrail);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
            cancelAnimationFrame(frameId);
        };
    }, [mouseX, mouseY]);

    if (!ready || isTouchDevice) return null;

    return (
        <>
            {/* Trail */}
            {!hovering && Array.from({ length: trailCount }).map((_, i) => (
                <div
                    key={`trail-${i}`}
                    ref={(el) => {
                        trailRefs.current[i] = el;
                    }}
                    className="fixed top-0 left-0 bg-accent rounded-full pointer-events-none z-[9998] will-change-transform"
                    style={{
                        width: `${Math.max(2, 6 - i)}px`,
                        height: `${Math.max(2, 6 - i)}px`,
                        opacity: 1 - i * 0.15,
                    }}
                />
            ))}

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
