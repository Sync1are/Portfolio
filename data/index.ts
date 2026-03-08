// ─── DATA FILE ─────────────────────────────────────────────
// All site content lives here. Fully typed. Every TODO marks
// a field you should replace with your own real data.
// ────────────────────────────────────────────────────────────

/* ── Interfaces ─────────────────────────────────────────── */

export interface Person {
    name: string;
    firstName: string;
    lastName: string;
    tagline: string;
    bio: string[];
    location: string;
}

export interface Language {
    name: string;
    level: string;
    percent: number;
}

export interface Stat {
    value: string;
    label: string;
}

export interface Project {
    number: string;
    title: string;
    description: string;
    tags: string[];
    liveUrl: string;
    repoUrl: string;
    bg: string;
}

export interface CodeProject {
    title: string;
    description: string;
    stack: string;
}

export interface Sketch {
    id: number;
    title: string;
    category: "Portraits" | "Characters" | "Landscapes" | "Studies";
    image: string; // path in /public/sketches — leave "" for placeholder
    bg: string;
    heightClass: string; // tailwind h-* for masonry variety
}

export interface Song {
    title: string;
    artist: string;
    album: string;
    color: string;
    emoji: string;
    audio: string; // URL to preview mp3 — leave "" and fill later
}

export interface Movie {
    title: string;
    director: string;
    year: string;
    poster: string; // path in /public/posters — leave "" for placeholder
    bg: string;
}

export interface Series {
    title: string;
    genre: string;
    year: string;
    seasons: number;
    poster: string;
    bg: string;
}

export interface Game {
    title: string;
    description: string;
    genre: string;
    emoji: string;
}

export interface Hobby {
    emoji: string;
    title: string;
    description: string;
}

export interface Social {
    platform: string;
    handle: string;
    url: string;
    icon: string; // SVG path data (d attribute)
}

/* ── Person ──────────────────────────────────────────────── */

export const PERSON: Person = {
    name: "Alex Mercer", // TODO: your full name
    firstName: "Alex", // TODO: your first name
    lastName: "Mercer", // TODO: your last name
    tagline:
        "Designer, developer & occasional dreamer — building things at the intersection of art and code.", // TODO: your one-liner
    bio: [
        "I'm a <strong>multidisciplinary creator</strong> who moves between code editors and sketchbooks with equal comfort. My work lives at the crossroads of <strong>technology and aesthetics</strong> — building digital experiences that feel as considered as a well-set page of type.", // TODO: first paragraph
        "When I'm not pushing pixels or debugging state machines, you'll find me <strong>sketching portraits</strong>, curating playlists that tell stories, or getting lost in open-world games that feel like living inside a painting.", // TODO: second paragraph
        "I believe the best work comes from <strong>genuine curiosity</strong>, quiet persistence, and a healthy disregard for the phrase \u201Cthat\u2019s how it\u2019s always been done.\u201D", // TODO: third paragraph
    ],
    location: "Somewhere on Earth", // TODO: your city / country
};

/* ── Languages ───────────────────────────────────────────── */

export const LANGUAGES: Language[] = [
    { name: "English", level: "Native", percent: 100 },
    { name: "Hindi", level: "Fluent", percent: 90 },
    { name: "Spanish", level: "Conversational", percent: 68 },
    { name: "German", level: "Learning", percent: 42 },
];

/* ── Stats ────────────────────────────────────────────────── */

export const STATS: Stat[] = [
    { value: "30+", label: "Sketches" },
    { value: "6", label: "Web Projects" },
    { value: "4+", label: "Code Projects" },
    { value: "4", label: "Languages Spoken" },
];

/* ── Skills ───────────────────────────────────────────────── */

export const SKILLS: string[] = [
    "TypeScript",
    "React / Next.js",
    "Tailwind CSS",
    "Node.js",
    "Python",
    "Three.js",
    "Figma",
    "GSAP",
    "PostgreSQL",
    "Git / GitHub",
    "Framer Motion",
    "Blender",
];

/* ── Web Projects ─────────────────────────────────────────── */

export const WEB_PROJECTS: Project[] = [
    {
        number: "01",
        title: "Spectral — Portfolio Theme",
        description:
            "A minimal portfolio template built with Next.js and Tailwind. Features scroll-driven animations, dark mode, and an editorial layout inspired by print design.",
        tags: ["Next.js", "Tailwind", "GSAP"],
        liveUrl: "", // TODO: paste live URL
        repoUrl: "", // TODO: paste repo URL
        bg: "var(--border)",
    },
    {
        number: "02",
        title: "Arcana — Dashboard UI",
        description:
            "A data-rich dashboard concept with real-time charts, refined typography, and an obsessive attention to spacing and hierarchy.",
        tags: ["React", "D3.js", "Styled Components"],
        liveUrl: "", // TODO: paste live URL
        repoUrl: "", // TODO: paste repo URL
        bg: "var(--accent-lt)",
    },
    {
        number: "03",
        title: "Vellum — Blog Engine",
        description:
            "A statically generated blog with MDX support, automatic OG image generation, and a reading-time estimate tuned for long-form essays.",
        tags: ["Next.js", "MDX", "Vercel OG"],
        liveUrl: "", // TODO: paste live URL
        repoUrl: "", // TODO: paste repo URL
        bg: "var(--accent)",
    },
    {
        number: "04",
        title: "Forma — Design System",
        description:
            "A component library with tokens for colour, type, spacing and motion — distilled from production projects into a reusable kit.",
        tags: ["Storybook", "Tailwind", "TypeScript"],
        liveUrl: "", // TODO: paste live URL
        repoUrl: "", // TODO: paste repo URL
        bg: "var(--muted)",
    },
    {
        number: "05",
        title: "Cinelounge — Movie Tracker",
        description:
            "A personal watchlist app that pulls from TMDb, lets you rate and tag films, and surfaces recommendations based on your taste graph.",
        tags: ["React", "TMDb API", "Firebase"],
        liveUrl: "", // TODO: paste live URL
        repoUrl: "", // TODO: paste repo URL
        bg: "var(--border)",
    },
    {
        number: "06",
        title: "Resonance — Audio Visualiser",
        description:
            "A WebGL audio visualiser that reacts to microphone input. Geometric shapes morph and pulse in sync with real-time frequency data.",
        tags: ["Three.js", "Web Audio API", "GLSL"],
        liveUrl: "", // TODO: paste live URL
        repoUrl: "", // TODO: paste repo URL
        bg: "var(--accent-lt)",
    },
];

/* ── Code / Python Projects ───────────────────────────────── */

export const CODE_PROJECTS: CodeProject[] = [
    {
        title: "Neural Style Transfer CLI",
        description:
            "A command-line tool that applies artistic style transfer to images using a pre-trained VGG-19 network.",
        stack: "Python · PyTorch",
    },
    {
        title: "Market Data Pipeline",
        description:
            "An ETL pipeline that ingests live stock data, cleans it, and stores structured time-series data for analysis.",
        stack: "Python · Pandas · Airflow",
    },
    {
        title: "Language Model Fine-Tuner",
        description:
            "Scripts for fine-tuning small language models on custom datasets with LoRA adapters and quantisation support.",
        stack: "Python · Transformers · PEFT",
    },
    {
        title: "Sketch Classifier",
        description:
            "A CNN that classifies hand-drawn sketches into 50 categories, trained on the Quick Draw dataset.",
        stack: "Python · TensorFlow",
    },
    {
        title: "Markdown Static Site Generator",
        description:
            "A lightweight SSG that converts a folder of markdown files into a full HTML site with templating and RSS.",
        stack: "Python · Jinja2",
    },
];

/* ── Sketches (32 entries) ────────────────────────────────── */

const categories: Sketch["category"][] = [
    "Portraits",
    "Characters",
    "Landscapes",
    "Studies",
];
const heights = [
    "h-[260px]",
    "h-[310px]",
    "h-[360px]",
    "h-[240px]",
    "h-[290px]",
    "h-[340px]",
    "h-[280px]",
    "h-[320px]",
];
const bgs = ["var(--border)", "var(--accent-lt)", "var(--accent)", "var(--muted)", "var(--hover)", "var(--card)"];

export const SKETCHES: Sketch[] = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    title: `${categories[i % 4]} Study ${Math.floor(i / 4) + 1}`,
    category: categories[i % 4],
    image: "", // TODO: drop your sketch image in /public/sketches/ and write the filename here
    bg: bgs[i % bgs.length],
    heightClass: heights[i % heights.length],
}));

/* ── Songs ────────────────────────────────────────────────── */

export const SONGS: Song[] = [
    {
        title: "Intro",
        artist: "The xx",
        album: "xx",
        color: "#A89070",
        emoji: "🎹",
        audio: "", // TODO: paste preview .mp3 URL
    },
    {
        title: "Motion Picture Soundtrack",
        artist: "Radiohead",
        album: "Kid A",
        color: "#6B7F8E",
        emoji: "🎻",
        audio: "", // TODO: paste preview .mp3 URL
    },
    {
        title: "Gymnopédie No. 1",
        artist: "Erik Satie",
        album: "Gymnopédies",
        color: "#C4A882",
        emoji: "🎼",
        audio: "", // TODO: paste preview .mp3 URL
    },
    {
        title: "Nuvole Bianche",
        artist: "Ludovico Einaudi",
        album: "Una Mattina",
        color: "#8B9DAF",
        emoji: "☁️",
        audio: "", // TODO: paste preview .mp3 URL
    },
    {
        title: "Tadow",
        artist: "Masego & FKJ",
        album: "Tadow",
        color: "#A0785A",
        emoji: "🎷",
        audio: "", // TODO: paste preview .mp3 URL
    },
];

/* ── Movies ───────────────────────────────────────────────── */

export const MOVIES: Movie[] = [
    {
        title: "Interstellar",
        director: "Christopher Nolan",
        year: "2014",
        poster: "", // TODO: drop poster in /public/posters/
        bg: "#2A2520",
    },
    {
        title: "The Grand Budapest Hotel",
        director: "Wes Anderson",
        year: "2014",
        poster: "", // TODO: drop poster in /public/posters/
        bg: "#8B4557",
    },
    {
        title: "Blade Runner 2049",
        director: "Denis Villeneuve",
        year: "2017",
        poster: "", // TODO: drop poster in /public/posters/
        bg: "#3B3A30",
    },
    {
        title: "Spirited Away",
        director: "Hayao Miyazaki",
        year: "2001",
        poster: "", // TODO: drop poster in /public/posters/
        bg: "#2D4A5A",
    },
];

/* ── Series ───────────────────────────────────────────────── */

export const SERIES: Series[] = [
    {
        title: "Arcane",
        genre: "Animation · Fantasy",
        year: "2021",
        seasons: 2,
        poster: "", // TODO
        bg: "#3A2F45",
    },
    {
        title: "Dark",
        genre: "Sci-Fi · Thriller",
        year: "2017",
        seasons: 3,
        poster: "", // TODO
        bg: "#2A2A2A",
    },
    {
        title: "Fleabag",
        genre: "Comedy · Drama",
        year: "2016",
        seasons: 2,
        poster: "", // TODO
        bg: "#5A3535",
    },
    {
        title: "Mr. Robot",
        genre: "Thriller · Drama",
        year: "2015",
        seasons: 4,
        poster: "", // TODO
        bg: "#1A2A1A",
    },
];

/* ── Games ────────────────────────────────────────────────── */

export const GAMES: Game[] = [
    {
        title: "Red Dead Redemption 2",
        description:
            "A sprawling western that trades twitch reflexes for quiet moments on horseback. The most lived-in open world ever made.",
        genre: "Open World · Action",
        emoji: "🤠",
    },
    {
        title: "Hollow Knight",
        description:
            "A hand-drawn metroidvania with hauntingly beautiful art and a difficulty curve that earns every victory.",
        genre: "Metroidvania · Indie",
        emoji: "🦋",
    },
    {
        title: "Celeste",
        description:
            "A precision platformer wrapped in a sincere story about anxiety, self-doubt, and climbing a very big mountain.",
        genre: "Platformer · Indie",
        emoji: "⛰️",
    },
    {
        title: "The Witcher 3",
        description:
            "The gold standard for narrative RPGs. Every side quest feels like a short story written by someone who cares.",
        genre: "RPG · Open World",
        emoji: "⚔️",
    },
    {
        title: "Journey",
        description:
            "Two hours of wordless, wind-swept beauty. A multiplayer experience that turns strangers into companions.",
        genre: "Adventure · Art Game",
        emoji: "🏜️",
    },
];

/* ── Hobbies ──────────────────────────────────────────────── */

export const HOBBIES: Hobby[] = [
    {
        emoji: "✏️",
        title: "Sketching",
        description:
            "Portraits, figure studies, quick gestures — anything that lets me slow down and really look at the world.",
    },
    {
        emoji: "🎮",
        title: "Gaming",
        description:
            "Story-driven RPGs and atmospheric indie games. I play for the art direction as much as the gameplay.",
    },
    {
        emoji: "🎧",
        title: "Music",
        description:
            "Ambient, jazz, post-rock — curating playlists that match moods, moments, and seasons.",
    },
    {
        emoji: "📖",
        title: "Reading",
        description:
            "Design essays, long-form journalism, the occasional novel that rewires how I think.",
    },
    {
        emoji: "🔧",
        title: "Building Things",
        description:
            "Weekend projects, CLI tools, generative experiments — building is how I learn.",
    },
    {
        emoji: "🌍",
        title: "Language Learning",
        description:
            "Currently chipping away at German. The grammar is brutal but the compound words are wonderful.",
    },
];

/* ── Socials ──────────────────────────────────────────────── */

export const SOCIALS: Social[] = [
    {
        platform: "GitHub",
        handle: "@alexmercer", // TODO: your GitHub handle
        url: "https://github.com/alexmercer", // TODO: your GitHub URL
        icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
    },
    {
        platform: "Discord",
        handle: "alexmercer#0000", // TODO: your Discord handle
        url: "https://discord.com", // TODO: your Discord invite link
        icon: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
    },
    {
        platform: "Instagram",
        handle: "@alexmercer", // TODO: your Instagram handle
        url: "https://instagram.com/alexmercer", // TODO: your Instagram URL
        icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    },
    {
        platform: "WhatsApp",
        handle: "+1 234 567 8900", // TODO: your WhatsApp number
        url: "https://wa.me/12345678900", // TODO: your WhatsApp link
        icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
    },
    {
        platform: "Spotify",
        handle: "Alex Mercer", // TODO: your Spotify display name
        url: "https://open.spotify.com", // TODO: your Spotify profile URL
        icon: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
    },
];

/* ── Gallery filter list ──────────────────────────────────── */

export const GALLERY_FILTERS = [
    "All Works",
    "Portraits",
    "Characters",
    "Landscapes",
    "Studies",
] as const;

export type GalleryFilter = (typeof GALLERY_FILTERS)[number];

/* ── Nav links ────────────────────────────────────────────── */

export const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#web-projects" },
    { label: "Art", href: "#art" },
    { label: "Music", href: "#music" },
    { label: "Taste", href: "#movies" },
    { label: "Socials", href: "#socials" },
] as const;
