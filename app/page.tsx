"use client";

import React from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

gsap.registerPlugin(ScrollTrigger);

// Dynamically import everything below the fold to massively reduce main thread blocking
// during hydration and initial load.
const Skills = dynamic(() => import("@/components/sections/Skills"));
const FeaturedProject = dynamic(() => import("@/components/sections/FeaturedProject"));
const WebProjects = dynamic(() => import("@/components/sections/WebProjects"));
const CodeProjects = dynamic(() => import("@/components/sections/CodeProjects"));
const ArtGallery = dynamic(() => import("@/components/sections/ArtGallery"));
const Music = dynamic(() => import("@/components/sections/Music"));
const Movies = dynamic(() => import("@/components/sections/Movies"));
const Series = dynamic(() => import("@/components/sections/Series"));
const Games = dynamic(() => import("@/components/sections/Games"));
const Hobbies = dynamic(() => import("@/components/sections/Hobbies"));
const Socials = dynamic(() => import("@/components/sections/Socials"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

function Quote({ text, author }: { text: string; author?: string }) {
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
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

  return (
    <section ref={sectionRef} className="section-padding bg-bg relative overflow-hidden flex items-center justify-center px-11 max-sm:px-6 border-t border-border no-count">
      <div className="max-w-[900px] mx-auto text-center reveal-item">
        <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-accent mb-6">
          &ldquo;{text}&rdquo;
        </h2>
        {author && (
          <span className="block text-[0.8rem] tracking-[0.2em] uppercase text-muted">
            — {author}
          </span>
        )}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <FeaturedProject />
        <WebProjects />
        <CodeProjects />
        <ArtGallery />
        <Quote text="Technology is best when it brings people together." author="Matt Mullenweg" />
        <Music />
        <Movies />
        <Series />
        <Games />
        <Hobbies />
        <Socials />
      </main>
      <Footer />
    </>
  );
}
