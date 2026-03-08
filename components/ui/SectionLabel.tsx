import React from "react";

interface SectionLabelProps {
    children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
    return (
        <span className="block text-[0.68rem] tracking-[0.22em] uppercase text-muted font-body font-normal mb-4">
            {children}
        </span>
    );
}
