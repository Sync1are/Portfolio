"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Sketch } from "@/data";

interface LightboxProps {
    sketches: Sketch[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

export default function Lightbox({
    sketches,
    currentIndex,
    isOpen,
    onClose,
    onPrev,
    onNext,
}: LightboxProps) {
    const current = sketches[currentIndex];

    const onKey = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        },
        [onClose, onPrev, onNext]
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", onKey);
        }
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [isOpen, onKey]);

    return (
        <AnimatePresence>
            {isOpen && current && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[500] flex flex-col items-center justify-center"
                    style={{ backgroundColor: "rgba(25, 19, 10, 0.95)" }}
                    onClick={onClose}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 w-[42px] h-[42px] border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors duration-200 text-lg"
                    >
                        ✕
                    </button>

                    {/* Prev button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onPrev();
                        }}
                        className="absolute left-5 top-1/2 -translate-y-1/2 w-[42px] h-[42px] border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors duration-200 sm:left-8"
                    >
                        ←
                    </button>

                    {/* Next button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onNext();
                        }}
                        className="absolute right-5 top-1/2 -translate-y-1/2 w-[42px] h-[42px] border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors duration-200 sm:right-8"
                    >
                        →
                    </button>

                    {/* Image / placeholder */}
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.92, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="max-w-[78vw] max-h-[80vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {current.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={current.image}
                                alt={current.title}
                                className="max-w-full max-h-[80vh] object-contain"
                            />
                        ) : (
                            <div
                                className="w-[60vw] max-w-[600px] h-[50vh] flex items-center justify-center font-display text-xl"
                                style={{ backgroundColor: current.bg, color: "#FDFAF3" }}
                            >
                                {current.title}
                            </div>
                        )}
                    </motion.div>

                    {/* Caption */}
                    <p className="text-[0.75rem] tracking-[0.08em] text-white/60 text-center mt-6">
                        {current.title} — {current.category} · {currentIndex + 1} /{" "}
                        {sketches.length}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
