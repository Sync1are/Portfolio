"use client";

import React from "react";
import dynamic from "next/dynamic";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

// Dynamically import everything below the fold to massively reduce main thread blocking
// during hydration and initial load.
const Skills = dynamic(() => import("@/components/sections/Skills"));
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

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <WebProjects />
        <CodeProjects />
        <ArtGallery />
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
