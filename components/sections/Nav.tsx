"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { NAV_LINKS, PERSON } from "@/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import ScrambleLink from "@/components/ui/ScrambleLink";

const Nav = React.memo(function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const navRef = useRef<HTMLElement>(null);

    // Scroll detection + active section
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        // Intersection Observer for active link
        const sections = NAV_LINKS.map((l) =>
            document.querySelector(l.href)
        ).filter(Boolean) as Element[];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                });
            },
            { rootMargin: "-40% 0px -50% 0px" }
        );

        sections.forEach((s) => observer.observe(s));

        return () => {
            window.removeEventListener("scroll", onScroll);
            observer.disconnect();
        };
    }, []);

    // GSAP nav transition
    useEffect(() => {
        if (!navRef.current) return;
        gsap.to(navRef.current, {
            paddingTop: scrolled ? "16px" : "24px",
            paddingBottom: scrolled ? "16px" : "24px",
            duration: 0.35,
            ease: "power2.out",
        });
    }, [scrolled]);

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 px-11 max-sm:px-6 flex items-center justify-between transition-colors duration-400 ${scrolled
                ? "bg-bg/90 backdrop-blur-md border-b border-border"
                : "bg-transparent"
                }`}
            style={{ paddingTop: "24px", paddingBottom: "24px" }}
        >
            {/* Name */}
            <a
                href="#hero"
                className="font-display text-[1.35rem] text-ink no-underline"
            >
                {PERSON.firstName}
                <span className="text-accent">.</span>
            </a>

            <div className="flex items-center gap-6">
                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8 mr-4">
                    {NAV_LINKS.map((link) => (
                        <ScrambleLink
                            key={link.href}
                            href={link.href}
                            className={`relative text-[0.72rem] tracking-[0.16em] uppercase no-underline transition-colors duration-300 group ${activeSection === link.href ? "text-ink" : "text-muted"
                                }`}
                        >
                            {link.label}
                        </ScrambleLink>
                    ))}
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="flex md:hidden flex-col gap-[5px] w-6 py-1"
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        className="block w-full h-[1px] bg-ink origin-center"
                    />
                    <motion.span
                        animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="block w-full h-[1px] bg-ink"
                    />
                    <motion.span
                        animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                        className="block w-full h-[1px] bg-ink origin-center"
                    />
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute top-full left-0 right-0 bg-bg/95 backdrop-blur-md border-b border-border overflow-hidden md:hidden"
                    >
                        <div className="flex flex-col px-11 py-6 gap-4">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-[0.78rem] tracking-[0.14em] uppercase text-muted hover:text-ink transition-colors duration-300 no-underline"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
});

export default Nav;
