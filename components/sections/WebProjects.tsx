"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { WEB_PROJECTS } from "@/data";

gsap.registerPlugin(ScrollTrigger);

/* ── Project Card with 3D tilt ──────────────────────────────── */

function ProjectCard({ project }: { project: typeof WEB_PROJECTS[number] }) {
    const cardRef = useRef<HTMLDivElement>(null);
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
            ref={cardRef}
            className="reveal-item border border-border bg-surface p-9 relative overflow-hidden group transition-shadow duration-400 hover:bg-card"
            style={{
                rotateX,
                rotateY,
                transformPerspective: 800,
            }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            whileHover={{ y: -5 }}
        >
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
            <div className="flex gap-6">
                {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.78rem] text-accent flex items-center gap-1 group/link hover:gap-2 transition-[gap] duration-300 no-underline"
                    >
                        Live <span>→</span>
                    </a>
                )}
                {project.repoUrl && (
                    <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.78rem] text-accent flex items-center gap-1 group/link hover:gap-2 transition-[gap] duration-300 no-underline"
                    >
                        Code <span>→</span>
                    </a>
                )}
                {!project.liveUrl && !project.repoUrl && (
                    <span className="text-[0.72rem] text-muted italic">Links coming soon</span>
                )}
            </div>
        </motion.div>
    );
}

/* ── Section ─────────────────────────────────────────────── */

const WebProjects = React.memo(function WebProjects() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        gsap.fromTo(
            sectionRef.current.querySelectorAll(".reveal-item"),
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
        const grid = sectionRef.current.querySelector(".project-grid");
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

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
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
                        <ProjectCard key={project.number} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
});

export default WebProjects;
