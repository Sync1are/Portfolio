"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface ScrambleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: string;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export default function ScrambleLink({ href, children, className, ...props }: ScrambleLinkProps) {
    const [text, setText] = useState(children);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isHovering) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setText(children);
            return;
        }

        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setText((children as string).split("").map((letter, index) => {
                if (index < iteration) {
                    return (children as string)[index];
                }
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join(""));

            if (iteration >= (children as string).length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
            iteration += 1 / 3;
        }, 30);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isHovering, children]);

    return (
        <Link
            href={href}
            className={className}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            data-cursor-hover
            {...props}
        >
            {text}
        </Link>
    );
}
