"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import { WEB_PROJECTS } from "@/data";

gsap.registerPlugin(ScrollTrigger);

/* ── Project Card with 3D tilt ──────────────────────────────── */

function ProjectCard({ project, onClick }: { project: typeof WEB_PROJECTS[number], onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
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

    const onMouseEnter = () => setIsHovered(true);

    const onMouseLeave = () => {
        setIsHovered(false);
        mx.set(0);
        my.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`reveal-item border border-border bg-surface p-9 relative overflow-hidden group transition-shadow duration-400 ${project.iframeUrl ? "cursor-pointer" : "hover:bg-card"}`}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 800,
            }}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => {
                if (project.iframeUrl) {
                    onClick();
                }
            }}
            whileHover={{ y: -5 }}
        >
            {/* Iframe Background on hover */}
            {project.iframeUrl && (
                <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 overflow-hidden ${isHovered ? "opacity-100" : "opacity-0"}`}>
                    {/* Render iframe always but change opacity to prevent reload on every hover */}
                    <iframe
                        src={project.iframeUrl}
                        className="w-[calc(150%+30px)] h-[150%] origin-top-left scale-[0.666] border-none pointer-events-none"
                    />
                </div>
            )}

            <div className={`relative z-10 transition-all duration-500 ${isHovered && project.iframeUrl ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Number */}
                <span className="block text-[0.72rem] text-muted tracking-[0.1em] mb-4">
                    {project.number}
                </span>

                {/* Title */}
                <h3 className="font-display text-[1.5rem] leading-[1.2] mb-3">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-[0.83rem] text-muted leading-[1.75] mb-5">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[0.63rem] tracking-[0.1em] uppercase border border-border px-3 py-1 text-muted"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-6 relative z-20">
                    {project.liveUrl && (
                        <MagneticButton>
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[0.78rem] text-accent flex items-center gap-1 group/link hover:gap-2 transition-[gap] duration-300 no-underline p-1"
                            >
                                Live <span>→</span>
                            </a>
                        </MagneticButton>
                    )}
                    {project.repoUrl && (
                        <MagneticButton>
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[0.78rem] text-accent flex items-center gap-1 group/link hover:gap-2 transition-[gap] duration-300 no-underline p-1"
                            >
                                Code <span>→</span>
                            </a>
                        </MagneticButton>
                    )}
                    {!project.liveUrl && !project.repoUrl && !project.iframeUrl && (
                        <span className="text-[0.72rem] text-muted italic pointer-events-auto">Links coming soon</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/* ── Section ─────────────────────────────────────────────── */

const WebProjects = React.memo(function WebProjects() {
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedProject, setSelectedProject] = useState<typeof WEB_PROJECTS[number] | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".reveal-item",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    },
                }
            );

            // Parallax for the grid
            const grid = sectionRef.current?.querySelector(".project-grid");
            if (grid) {
                gsap.fromTo(
                    grid,
                    { y: 60 },
                    {
                        y: -60,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="web-projects"
            className="section-padding bg-surface border-t border-border"
        >
            <div className="max-w-[1180px] mx-auto px-11 max-sm:px-6">
                <div className="reveal-item">
                    <SectionLabel>Web Development</SectionLabel>
                    <h2 className="font-display text-[2.8rem] max-sm:text-[2rem] font-light mb-14 leading-[1.1]">
                        Selected projects
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-[2px] project-grid will-change-transform">
                    {WEB_PROJECTS.map((project) => (
                        <ProjectCard key={project.number} project={project} onClick={() => setSelectedProject(project)} />
                    ))}
                </div>
            </div>

            {/* Interactive Modal */}
            <AnimatePresence>
                {selectedProject && selectedProject.iframeUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 p-4 sm:p-10 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-5 right-5 w-[42px] h-[42px] border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors duration-200 text-lg z-10"
                        >
                            ✕
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, delay: 0.05 }}
                            className="w-full h-full max-w-[1400px] border border-white/10 rounded-none overflow-hidden bg-surface relative flex flex-col shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={selectedProject.iframeUrl}
                                className="absolute inset-y-0 left-0 w-[calc(100%+24px)] h-full border-none opacity-0 transition-opacity duration-1000 ease-in-out bg-surface"
                                onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
});

export default WebProjects;
