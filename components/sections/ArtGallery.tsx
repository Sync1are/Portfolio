"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import Lightbox from "@/components/ui/Lightbox";
import { SKETCHES, GALLERY_FILTERS } from "@/data";
import type { GalleryFilter, Sketch } from "@/data";

gsap.registerPlugin(ScrollTrigger);

function GalleryItem({ sketch, i, onClick }: { sketch: Sketch; i: number; onClick: () => void }) {
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), {
        stiffness: 200,
        damping: 20,
    });
    const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), {
        stiffness: 200,
        damping: 20,
    });

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const onMouseLeave = () => {
        mx.set(0);
        my.set(0);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
            className="break-inside-avoid mb-[10px] relative overflow-hidden cursor-pointer group"
            onClick={onClick}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 1000,
            }}
            whileHover={{ zIndex: 10, scale: 1.01 }}
        >
            {/* Image or Placeholder */}
            {sketch.image ? (
                <img
                    src={sketch.image}
                    alt={sketch.title}
                    loading="lazy"
                    className={`w-full ${sketch.heightClass} object-cover transition-transform duration-500 group-hover:scale-105`}
                />
            ) : (
                <div
                    className={`w-full ${sketch.heightClass} flex items-center justify-center font-display text-[0.95rem] transition-transform duration-500 group-hover:scale-105`}
                    style={{ backgroundColor: sketch.bg, color: "#FDFAF3" }}
                >
                    {sketch.title}
                </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[rgba(35,29,18,0)] group-hover:bg-[rgba(35,29,18,0.46)] transition-colors duration-400 flex items-end p-4">
                <span className="font-display text-[0.85rem] text-surface translate-y-[7px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    {sketch.title}
                </span>
            </div>
        </motion.div>
    );
}

const ArtGallery = React.memo(function ArtGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const [filter, setFilter] = useState<GalleryFilter>("All Works");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const filtered = useMemo(() => {
        if (filter === "All Works") return SKETCHES;
        return SKETCHES.filter((s) => s.category === filter);
    }, [filter]);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".reveal-item",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 1,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);

    const prevLightbox = useCallback(() => {
        setLightboxIndex((i) => (i === 0 ? filtered.length - 1 : i - 1));
    }, [filtered.length]);

    const nextLightbox = useCallback(() => {
        setLightboxIndex((i) => (i === filtered.length - 1 ? 0 : i + 1));
    }, [filtered.length]);

    return (
        <section
            ref={sectionRef}
            id="art"
            className="section-padding bg-surface border-t border-border"
        >
            <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6">
                <div className="reveal-item">
                    <SectionLabel>Art & Sketches</SectionLabel>
                    <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light mb-10 leading-[1.1]">
                        Visual explorations
                    </h2>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-[10px] mb-12 reveal-item">
                    {GALLERY_FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-[9px] text-[0.72rem] tracking-[0.12em] uppercase border transition-all duration-400 ${filter === f
                                ? "bg-accent border-accent text-surface"
                                : "border-border text-muted hover:border-accent-lt hover:text-ink"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Masonry grid */}
                <div className="columns-4 max-lg:columns-3 max-md:columns-2 gap-[10px]">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((sketch, i) => (
                            <GalleryItem
                                key={sketch.id}
                                sketch={sketch}
                                i={i}
                                onClick={() => openLightbox(i)}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                sketches={filtered}
                currentIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={closeLightbox}
                onPrev={prevLightbox}
                onNext={nextLightbox}
            />
        </section>
    );
});

export default ArtGallery;
