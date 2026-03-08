"use client";

import React from "react";
import { PERSON } from "@/data";

const Footer = React.memo(function Footer() {
    return (
        <footer className="border-t border-border py-11 px-11 max-sm:px-6 flex justify-between items-center flex-wrap gap-4">
            <span className="font-display text-[1.1rem]">{PERSON.name}</span>

            <span className="text-[0.74rem] text-muted tracking-[0.06em]">
                Designed & built with care · 2025
            </span>

            <a
                href="#hero"
                className="text-[0.72rem] tracking-[0.14em] uppercase text-accent no-underline hover:text-ink transition-colors duration-300"
            >
                Back to top ↑
            </a>
        </footer>
    );
});

export default Footer;
