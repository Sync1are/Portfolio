import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./data/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: "#F7F2E8",
                card: "#EDE6D4",
                hover: "#E4DAC5",
                ink: "#231D12",
                muted: "#7A6A52",
                accent: "#8B6747",
                "accent-lt": "#C4A882",
                border: "#D6C8AE",
                surface: "#FDFAF3",
            },
            fontFamily: {
                display: ["var(--font-cormorant)", "serif"],
                body: ["var(--font-jost)", "sans-serif"],
            },
            transitionDuration: {
                "400": "400ms",
            },
            transitionTimingFunction: {
                smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            },
            keyframes: {
                "scroll-fill": {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100%)" },
                },
                mbar: {
                    "0%, 100%": { transform: "scaleY(1)" },
                    "50%": { transform: "scaleY(0.25)" },
                },
            },
            animation: {
                "scroll-fill": "scroll-fill 1.8s ease-in-out infinite",
                mbar: "mbar 0.8s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

export default config;
