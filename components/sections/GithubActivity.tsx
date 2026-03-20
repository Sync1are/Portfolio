"use client";

import React, { useEffect, useRef, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const GITHUB_USERNAME = "sync1are";

function AnimatedNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = 0;
    const end = value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(start + (end - start) * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

async function fetchGitHubContributions(username: string): Promise<ContributionDay[]> {
  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();

    return data.contributions.map((day: { date: string; count: number; level: number }) => ({
      date: day.date,
      count: day.count,
      level: Math.min(4, day.level) as 0 | 1 | 2 | 3 | 4,
    }));
  } catch {
    const days: ContributionDay[] = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toISOString().split("T")[0],
        count: 0,
        level: 0,
      });
    }
    return days;
  }
}

export default function GithubActivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchGitHubContributions(GITHUB_USERNAME).then((data) => {
      setContributions(data);
      setTotalContributions(data.reduce((sum, day) => sum + day.count, 0));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".github-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            onEnter: () => setIsVisible(true),
          },
        }
      );

      // Parallax effect on calendar box
      if (calendarRef.current) {
        gsap.to(calendarRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [loading]);

  const theme = {
    light: ["#EDE6D4", "#E8D5B5", "#D4A574", "#B87333", "#8B4513"],
    dark: ["#1D1914", "#3D2914", "#6B4423", "#B87333", "#D4A574"],
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-bg border-t border-border px-11 max-sm:px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="github-reveal mb-10">
          <span className="block text-[0.7rem] tracking-[0.25em] uppercase text-muted mb-3">
            Open Source
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">
            GitHub Activity
          </h2>
          <p className="text-muted text-sm mt-2 max-w-md">
            My contribution history over the past year — building, experimenting, and shipping.
          </p>
        </div>

        {/* Stats Row */}
        <div className="github-reveal flex flex-wrap gap-8 mb-8">
          <div className="group cursor-default">
            <span className="block text-2xl font-display text-accent transition-transform group-hover:scale-110 origin-left">
              {isVisible ? <AnimatedNumber value={totalContributions} /> : 0}
            </span>
            <span className="text-xs text-muted uppercase tracking-wider">Contributions</span>
          </div>
          <div className="ml-auto">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-ink hover:bg-hover hover:border-accent transition-all duration-300 group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              @{GITHUB_USERNAME}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Calendar */}
        <div 
          ref={calendarRef}
          className="github-reveal bg-card border border-border rounded-lg p-6 overflow-x-auto hover:border-accent/50 transition-colors duration-300 relative group"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {loading ? (
            <div className="h-32 flex items-center justify-center text-muted">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                Loading contributions...
              </div>
            </div>
          ) : (
            <ActivityCalendar
              data={contributions}
              theme={theme}
              blockSize={12}
              blockMargin={4}
              blockRadius={2}
              fontSize={12}
              showWeekdayLabels
              labels={{
                totalCount: "{{count}} contributions in the last year",
              }}
            />
          )}
        </div>

        {/* Legend */}
        <div className="github-reveal mt-4 flex items-center justify-end gap-2 text-xs text-muted">
          <span>Less</span>
          {theme.light.map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm transition-transform hover:scale-125"
              style={{ backgroundColor: color }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  );
}
