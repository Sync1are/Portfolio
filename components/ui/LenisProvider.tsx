"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Integrate with GSAP ScrollTrigger if available
        lenis.on("scroll", () => {
            if (typeof window !== "undefined") {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const ST = (window as any).__gsapScrollTrigger;
                if (ST) ST.update();
            }
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
